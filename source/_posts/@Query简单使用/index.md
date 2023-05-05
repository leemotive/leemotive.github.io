---
title: "@Query简单使用"
author: 柚子816
toc: true
comment: true
date: 2013-10-27 15:28:00
tags: 
  - spring
category: Java
cover: 
---

项目上在与数据库之间的交互采用的是@Query，和entityManager，下面做个简单记述

先说@Query，项目上做如下编码即可从数据库查询数据


​    
```java
@Query("select mu from MUser mu")
public List<MUser> findUser();
```

调用findUser方法即可执行注解@Query中的SQL，下面看如何配置使方法生效


​    
```java
package lee.spring.jpa.query.dao;

import ....

public interface MUserDao extends JpaRepository<MUser, Long>{

	@Query("select mu from MUser mu")
	public List<MUser> findUser();
}
```

这时MUserDao接口定义，注意继承JpaRepository，其中MUser是和数据库表映射的实体类，至于实体类文件如何编写，不作介绍了

下面进行配置了，spring配置文件中加入dataSource的配置


​    
```xml
<bean id="dataSource" class="org.springframework.jndi.JndiObjectFactoryBean">
    <property name="jndiName">
        <value>java:comp/env/jdbc/MySqlDS</value>
    </property>
</bean>
```

这里采用JNDI方式，在web.xml文件中加入


​    
```xml
<resource-ref> 
    <description>DBConnection</description> 
    <res-ref-name>jdbc/MySqlDS</res-ref-name> 
    <res-type>javax.sql.DataSource</res-type> 
    <res-auth>Container</res-auth> 
</resource-ref>
```

我用的服务器是Tomcat，在context .xml中加入


​    
```xml
<Resource name="jdbc/MySqlDS" auth="Container" type="javax.sql.DataSource"
     maxIdle="30" maxActive="10" maxWait="10000" username="username" password="password"
     driverClassName="com.mysql.jdbc.Driver" 
     url="jdbc:mysql://localhost:3306/school"/>
```

注意name和web.xml，spring配置文件的对应，driver和url根据不同数据库不一样，以上是配置数据库信息

下面在spring配置文件中加入


​    
```xml
<jpa:repositories base-package="lee.spring.jpa.query.dao"
    entity-manager-factory-ref="entityManagerFactory"   />
```

base-pack所配置是上文MUserDao 文件所在包路径

配置中用到了entityManagerFactory，所以还要添加entityManagerFactory的配置


​    
```xml
<bean id="entityManagerFactory"
    class="org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean">
    <property name="dataSource" ref="dataSource" />
    <property name="persistenceUnitName" value="users" />
    <property name="persistenceXmlLocation" value="/WEB-INF/persistence.xml" />
    <property name="jpaVendorAdapter">
        <bean
            class="org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter">
            <property name="showSql" value="true" />
            <property name="database" value="MYSQL" />
            <property name="generateDdl" value="false" />
            <property name="databasePlatform" value="org.hibernate.dialect.MySQL5Dialect" />
        </bean>
    </property>
</bean>
```

在entityManager中用到的persistenceUnitName和persistenceXmlLocation是配置persistence.xml文件

这个文件是配置持久单元，负责定义应用中的一组实体如何进行管理和持久性。

下面是


​    
```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence version="2.0"
    xmlns="http://java.sun.com/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd">
    <persistence-unit name="users" transaction-type="RESOURCE_LOCAL">
        <provider>org.hibernate.ejb.HibernatePersistence</provider>
        <class>lee.spring.jpa.query.model.MUser</class>

    </persistence-unit>
</persistence>
```

下面看代码中怎么使用


​    
```java
@Autowired
private MUserDao mUserDao;

public void queryFind(){
	List<MUser> list = mUserDao.findUser();
}
```

成员变量mUserDao和查询方法

至此调用queryFind方法即可查到数据。这里仅仅简单技术一下用法，所以没有service类了。方法也不设返回值。

另一种方法。使用entityManager。

在spring配置文件中加入


​    
```xml
<bean id="entityManager" class="org.springframework.orm.jpa.support.SharedEntityManagerBean">
    <property name="entityManagerFactory" ref="entityManagerFactory"/>
</bean>
```

在使用的地方


​    
```java
@Autowired
private EntityManager em;
```

这时类成员变量，采用自动注入方式

在某个方法中，如刚才的queryFind方法中加入


​    
```java
StringBuffer sql = new StringBuffer();
sql.append("SELECT * FROM USERS U");
Query query = em.createNativeQuery(sql.toString());
SQLQuery qe = (SQLQuery)((HibernateQuery)query).getHibernateQuery();
qe.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
List<Map<String,Object>> result = query.getResultList();
```

倒数第二行第三行是为了把查询结果以map形式返回。当然还可以以其他形式返回，如直接返回实体类对象。还可以设置参数，设置查询条数，相关内容不详述了。

