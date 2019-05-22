# RSA
前端使用[node-rsa](https://github.com/rzcoder/node-rsa)

```javascript
// 公钥
var pub = new NodeRSA(`-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANfENzn7UWlo34c/oXYBbnMXT9A6PRo9
U/hOIK6cZxhgIO2ad5QcBtZIREA5JXTIkB9WIDFM+TgmrXMyvWP6UxUCAwEAAQ==
-----END PUBLIC KEY-----`, 'pkcs8-public')

//私钥
var pri = new NodeRSA(`-----BEGIN PRIVATE KEY-----
MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEA18Q3OftRaWjfhz+h
dgFucxdP0Do9Gj1T+E4grpxnGGAg7Zp3lBwG1khEQDkldMiQH1YgMUz5OCatczK9
Y/pTFQIDAQABAkBfTvAqL4ZdrpKWdpgGvUkhk5mQ3DjjX1W5KCGtn662h+hBCUJ8
Xc7KOlXfK+QC5qDMO25L6NkuSyrhes7jmxbBAiEA7DiLSmb/DK/FouNURc/L1ZtJ
elxVkrNiuh+rrKGYAnECIQDp1TngGAmS7JYsOyRSTnOS/PxzibgHnOCpoXTBxMxk
5QIgMo8LqRoQXtvENk/nuqV2IDsDaBAZNLP2XpXmvaU8jtECIQChwqET9m0BF+vX
U16QFbd8MskNwHLvyUXd81SLC3J+RQIhANMfr7HEu8ag8sUeDJJs5NVAnTZGVlUP
6VqhLujXpHJE
-----END PRIVATE KEY-----
`, 'pkcs8-private')


//公钥加密, 私钥解密
var encrypted = pub.encrypt('用公钥加密的数据', 'base64');
var decrypted = pri.decrypt(encrypted, 'utf8');

//私钥加密，公钥解密
var encrypted2 = pri.encryptPrivate('用私钥加密的数据', 'base64');
var decrypted2 = pub.decryptPublic(encrypted2, 'utf8');
```

如果后端对应的是[java](../java/rsa.md),将会出现前后端不能互相加密解密,这时js需要添加如下调整
```javascript
pub.setOptions({encryptionScheme: 'pkcs1'})
pri.setOptions({encryptionScheme: 'pkcs1'})
```
