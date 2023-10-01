---
title: midway+typeorm 动态建表及查询
author: 柚子816
toc: true
comment: true
date: 2023-10-01 22:19:59
tags: 
  - midway
  - typeorm
category: 前端
cover: cover.webp
---



在表 A 每创建一条数据时，就动态创建一个表，用于存储相关数据，原本可以将所有数据放在同一个表中，用一个字段作为外键关联表 A 中的的数据。但是不知道为什么当时脑子一抽就想要动态建表。真是没事给自己找事，



## Midway 和 Typeorm

[Midway](https://midwayjs.org/) 是一个开源Node.js 服务端框架，兼容多种上层框架，比如 Express, Koa。同时还有 IoC, AOP等，简直要和 Java 的 springboot 啥的无缝切换了

[Typeorm](https://typeorm.io/)是一个js 实现的orm 框架，通过定义类属性和数据库表字段之间的映射关系，使数据库操作更加简单高效。



## Entity

Typeorm中要实现类属性和表字段的映射，需要定义一个 class 并使用 Entity 装饰器

```typescript
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('table_a')
export default class TableA {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @Column()
  description: string;
}

```

这样就定义了一个有三个字段的表，如果 typeorm 的配置项 [synchronize](https://midwayjs.org/docs/extensions/orm) 还配置为 true。那在项目启动时将会自动根据这个创建一个表，表名就叫 **table_a**



## 动态建表

原本建表只需要通过框架执行一条 `create table` 的建表语句即可，可是项目中既然使用 orm 框架，并且后续还要对表进行查询，那就不要直接使用建表语句这种最原始的方法，一切还是交给entity 吧

上面的定义可以说是静态的，在项目启动时就已经定义好表名及字段，项目启动时就可以直接初始化建表。但是现在项目的需求是在项目运行过程中，每在 **table_a** 中创建一条数据，就创建一个新的表存储和这条数据相相关系的表，表名就使用 table_a 中数据的 name 字段。那这样的 entity 就没法提前定义了，必须在项目运行过程中动态定义并建表

midway 及 typeorm 的文档中貌似并没有提到相关的功能。所以只能先探明项目启动时是如何自动通过 entity 进行建表的。然后再在项目中把这个逻辑再手动走一遍。说干就干呗



## Typeorm之sychronize

```typescript
/**
 * Performs connection to the database.
 * This method should be called once on application bootstrap.
 * This method not necessarily creates database connection (depend on database type),
 * but it also can setup a connection pool with database to use.
 */
async initialize(): Promise<this> {
    if (this.isInitialized)
        throw new CannotConnectAlreadyConnectedError(this.name)

    // connect to the database via its driver
    await this.driver.connect()

    // connect to the cache-specific database if cache is enabled
    if (this.queryResultCache) await this.queryResultCache.connect()

    // set connected status for the current connection
    ObjectUtils.assign(this, { isInitialized: true })

    try {
        // build all metadatas registered in the current connection
        await this.buildMetadatas()  // 主要是把定义 entity class 编译成metadata

        await this.driver.afterConnect()

        // if option is set - drop schema once connection is done
        if (this.options.dropSchema) await this.dropDatabase()

        // if option is set - automatically synchronize a schema
        if (this.options.migrationsRun)
            await this.runMigrations({
                transaction: this.options.migrationsTransactionMode,
            })

        // if option is set - automatically synchronize a schema
        if (this.options.synchronize) await this.synchronize() // 根据编译出来的 metadata 自动建表
    } catch (error) {
        // if for some reason build metadata fail (for example validation error during entity metadata check)
        // connection needs to be closed
        await this.destroy()
        throw error
    }

    return this
}
```



以上代码复制于 typeorm 框架的源码[DataSource.ts](https://github.com/typeorm/typeorm/blob/master/src/data-source/DataSource.ts) ，可以看到在初始化逻辑中有调用 buildMetadatas 用于编译 entity，调用 synchronize 主要功能就是建表。



### buildMetadatas

还是在 [DataSource.ts](https://github.com/typeorm/typeorm/blob/master/src/data-source/DataSource.ts) 文件中buildMetadatas 方法中对当前需求最重要的几行是

```typescript
const entityMetadatas =
    await connectionMetadataBuilder.buildEntityMetadatas(
        flattenedEntities,
    )
ObjectUtils.assign(this, {
    entityMetadatas: entityMetadatas,
    entityMetadatasMap: new Map(
        entityMetadatas.map((metadata) => [metadata.target, metadata]),
    ),
})
```

这是在当前动态建表需求中要执行的几行代码



### synchronize

通过 synchronize方法的查看,最终在[RdbmsSchemaBuilder.ts](https://github.com/typeorm/typeorm/blob/master/src/schema-builder/RdbmsSchemaBuilder.ts)文件中找到了通过 createTable 进行建表相关的代码

在文件中有两处调用了 createTable 方法，对比方法都是构建 Table 对象，并作为参数传递给 createTable 方法



## 代码

```typescript
import { getCurrentApplicationContext } from '@midwayjs/core';
import { TypeORMDataSourceManager } from '@midwayjs/typeorm';
import { DataSource, Entity, Table } from 'typeorm';
import { ConnectionMetadataBuilder } from 'typeorm/connection/ConnectionMetadataBuilder';
import DynamicBaseEntity from '../../entity/dynamic.base.entity';

function getEntity(name: string) {
  const tableName = `table_${name}`;
	// 定义定义 entity 主要是动态表名，动态创建的表字段都是一致的，所以放在基类DynamicBaseEntity里了，
  // 基类中不需要使用对 class 使用 Entity 装饰器，只对属性使用 Column 装饰器
  // 基类中的 class 并不是真正的 entity 所以添加 abstract 关键字定义成抽象类  
  @Entity(tableName)
  class DynamicEntity extends DynamicBaseEntity {}
  return DynamicEntity;
}

async function getDataSource() {
  // 在 midway 项目中获取 dataSource 的方法
  const sourceManager = await getCurrentApplicationContext().getAsync(TypeORMDataSourceManager);
  return sourceManager.getDataSource('default');
}

async function getMetadata(dataSource: DataSource, name: string) {
  const tableName = `table_${name}`;
  if (!dataSource.hasMetadata(tableName)) {
    const DynamicEntity = getEntity(name);
    // 手动构建builder 并将 entity 构建成 metadata
    const [entityMetadata] = await new ConnectionMetadataBuilder(dataSource).buildEntityMetadatas([DynamicEntity]);
    dataSource.entityMetadatas.push(entityMetadata);
    dataSource.entityMetadatasMap.set(entityMetadata.target, entityMetadata);
  }
  return dataSource.getMetadata(tableName);
}

// 通过调用此方法动态建表
export async function createTable(name: string) {
  const dataSource = await getDataSource();
  const metadata = await getMetadata(dataSource, name);

  const runner = dataSource.createQueryRunner();
  // 通过 metadata 创建 Table 的实例对象，并传递给 createTable 方法
  await runner.createTable(Table.create(metadata, dataSource.driver));
  await runner.release();
}
```

在完成动态创建表的功能后，就是考虑通过查询数据



传统方法是通过 InjectEntityModel 注解的方式获取 Repository 实例并查询，然后现在 entity 是动态的，表也是动态建的，所以这个 Repository 自然也是动态根据表名来获取的，

```typescript
export async function getRepositry(name: string) {
  const dataSource = await getDataSource();
  const tableName = `table_${name}`;
  await getMetadata(dataSource, name);

  return dataSource.getRepository<DynamicBaseEntity>(tableName);
}
```

如此获取到指定表的 Repository 的实例对象，就是可以像平常一样调用相关的增删改查方法了



----



以上就是动态建表的方式，所有表的字段定义都是一致的，只是表名不一样，所以在基类中定义好所有字段，不知道是否可以字段也是动态的(没这个需求，所以也就没继续研究)。对于文中所述如果有更好的方法或者觉得有什么欠妥的地方，欢迎指正
