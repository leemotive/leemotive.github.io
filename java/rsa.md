# RSA

```java
package gradle.demo;


import org.apache.tomcat.util.codec.binary.Base64;
import sun.misc.BASE64Decoder;

import javax.crypto.Cipher;
import java.io.IOException;
import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Map;

public class RSACoder {
    //非对称密钥算法
    public static final String KEY_ALGORITHM = "RSA";


    /**
     * 密钥长度，DH算法的默认密钥长度是1024
     * 密钥长度必须是64的倍数，在512到65536位之间
     */
    private static final int KEY_SIZE = 512;
    //公钥
    private static final String PUBLIC_KEY = "RSAPublicKey";

    //私钥
    private static final String PRIVATE_KEY = "RSAPrivateKey";

    /**
     * 初始化密钥对
     *
     * @return Map 甲方密钥的Map
     */
    public static Map<String, Object> initKey() throws Exception {
        //实例化密钥生成器
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(KEY_ALGORITHM);
        //初始化密钥生成器
        keyPairGenerator.initialize(KEY_SIZE);
        //生成密钥对
        KeyPair keyPair = keyPairGenerator.generateKeyPair();
        //甲方公钥
        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        //甲方私钥
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
        //将密钥存储在map中
        Map<String, Object> keyMap = new HashMap<String, Object>();
        keyMap.put(PUBLIC_KEY, publicKey);
        keyMap.put(PRIVATE_KEY, privateKey);
        return keyMap;

    }


    /**
     * 私钥加密
     */
    public static byte[] encryptByPrivateKey(byte[] data, byte[] key) throws Exception {

        //取得私钥
        PKCS8EncodedKeySpec pkcs8KeySpec = new PKCS8EncodedKeySpec(key);
        KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
        //生成私钥
        PrivateKey privateKey = keyFactory.generatePrivate(pkcs8KeySpec);
        //数据加密
        Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
        cipher.init(Cipher.ENCRYPT_MODE, privateKey);
        return cipher.doFinal(data);
    }

    /**
     * 公钥加密
     */
    public static byte[] encryptByPublicKey(byte[] data, byte[] key) throws Exception {

        //实例化密钥工厂
        KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
        //初始化公钥
        //密钥材料转换
        X509EncodedKeySpec x509KeySpec = new X509EncodedKeySpec(key);
        //产生公钥
        PublicKey pubKey = keyFactory.generatePublic(x509KeySpec);

        //数据加密
        Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
        cipher.init(Cipher.ENCRYPT_MODE, pubKey);
        return cipher.doFinal(data);
    }

    /**
     * 私钥解密
     */
    public static byte[] decryptByPrivateKey(byte[] data, byte[] key) throws Exception {
        //取得私钥
        PKCS8EncodedKeySpec pkcs8KeySpec = new PKCS8EncodedKeySpec(key);
        KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
        //生成私钥
        PrivateKey privateKey = keyFactory.generatePrivate(pkcs8KeySpec);
        //数据解密
        Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        return cipher.doFinal(data);
    }

    /**
     * 公钥解密
     */
    public static byte[] decryptByPublicKey(byte[] data, byte[] key) throws Exception {

        //实例化密钥工厂
        KeyFactory keyFactory = KeyFactory.getInstance(KEY_ALGORITHM);
        //初始化公钥
        //密钥材料转换
        X509EncodedKeySpec x509KeySpec = new X509EncodedKeySpec(key);
        //产生公钥
        PublicKey pubKey = keyFactory.generatePublic(x509KeySpec);
        //数据解密
        Cipher cipher = Cipher.getInstance(keyFactory.getAlgorithm());
        cipher.init(Cipher.DECRYPT_MODE, pubKey);
        return cipher.doFinal(data);
    }

    /**
     * 取得私钥
     */
    public static byte[] getPrivateKey(Map<String, Object> keyMap) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        //Key key = (Key) keyMap.get(PRIVATE_KEY);

        byte[] keyBytes;
        keyBytes = (new BASE64Decoder()).decodeBuffer("MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEA18Q3OftRaWjfhz+h\n" +
                "dgFucxdP0Do9Gj1T+E4grpxnGGAg7Zp3lBwG1khEQDkldMiQH1YgMUz5OCatczK9\n" +
                "Y/pTFQIDAQABAkBfTvAqL4ZdrpKWdpgGvUkhk5mQ3DjjX1W5KCGtn662h+hBCUJ8\n" +
                "Xc7KOlXfK+QC5qDMO25L6NkuSyrhes7jmxbBAiEA7DiLSmb/DK/FouNURc/L1ZtJ\n" +
                "elxVkrNiuh+rrKGYAnECIQDp1TngGAmS7JYsOyRSTnOS/PxzibgHnOCpoXTBxMxk\n" +
                "5QIgMo8LqRoQXtvENk/nuqV2IDsDaBAZNLP2XpXmvaU8jtECIQChwqET9m0BF+vX\n" +
                "U16QFbd8MskNwHLvyUXd81SLC3J+RQIhANMfr7HEu8ag8sUeDJJs5NVAnTZGVlUP\n" +
                "6VqhLujXpHJE");
        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PrivateKey privateKey = keyFactory.generatePrivate(keySpec);


        return privateKey.getEncoded();
    }

    /**
     * 取得公钥
     */
    public static byte[] getPublicKey(Map<String, Object> keyMap) throws Exception {
        //Key key = (Key) keyMap.get(PUBLIC_KEY);

        byte[] keyBytes;
        keyBytes = (new BASE64Decoder()).decodeBuffer("MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANfENzn7UWlo34c/oXYBbnMXT9A6PRo9\n" +
                "U/hOIK6cZxhgIO2ad5QcBtZIREA5JXTIkB9WIDFM+TgmrXMyvWP6UxUCAwEAAQ==");
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        PublicKey publicKey = keyFactory.generatePublic(keySpec);

        return publicKey.getEncoded();
    }

    
    public static void main(String[] args) throws Exception {
        //初始化密钥
        //生成密钥对
        Map<String, Object> keyMap = RSACoder.initKey();
        //公钥
        byte[] publicKey = RSACoder.getPublicKey(keyMap);

        //私钥
        byte[] privateKey = RSACoder.getPrivateKey(keyMap);
        System.out.println("公钥：  " + Base64.encodeBase64String(publicKey));
        System.out.println("私钥：  " + Base64.encodeBase64String(privateKey) + "\n\n");

        String str = "RSA密码交换算法";
        System.out.println("原文: " + str);
        //甲方进行数据的加密
        byte[] code1 = RSACoder.encryptByPrivateKey(str.getBytes(), privateKey);
        System.out.println("私钥加密后：" + Base64.encodeBase64String(code1));
        byte[] decode1 = RSACoder.decryptByPublicKey(code1, publicKey);
        System.out.println("公钥解密后：" + new String(decode1) + "\n\n");


        str = "乙方向甲方发送数据RSA算法";
        System.out.println("原文:" + str);

        //乙方使用公钥对数据进行加密
        byte[] code2 = RSACoder.encryptByPublicKey(str.getBytes(), publicKey);
        System.out.println("公钥加密后：" + Base64.encodeBase64String(code2));

        //甲方使用私钥对数据进行解密
        byte[] decode2 = RSACoder.decryptByPrivateKey(code2, privateKey);
        System.out.println("私钥解密后：" + new String(decode2));
    }
}

```

控制台输出结果
```
公钥：  MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANfENzn7UWlo34c/oXYBbnMXT9A6PRo9U/hOIK6cZxhgIO2ad5QcBtZIREA5JXTIkB9WIDFM+TgmrXMyvWP6UxUCAwEAAQ==  
私钥：  MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEA18Q3OftRaWjfhz+hdgFucxdP0Do9Gj1T+E4grpxnGGAg7Zp3lBwG1khEQDkldMiQH1YgMUz5OCatczK9Y/pTFQIDAQABAkBfTvAqL4ZdrpKWdpgGvUkhk5mQ3DjjX1W5KCGtn662h+hBCUJ8Xc7KOlXfK+QC5qDMO25L6NkuSyrhes7jmxbBAiEA7DiLSmb/DK/FouNURc/L1ZtJelxVkrNiuh+rrKGYAnECIQDp1TngGAmS7JYsOyRSTnOS/PxzibgHnOCpoXTBxMxk5QIgMo8LqRoQXtvENk/nuqV2IDsDaBAZNLP2XpXmvaU8jtECIQChwqET9m0BF+vXU16QFbd8MskNwHLvyUXd81SLC3J+RQIhANMfr7HEu8ag8sUeDJJs5NVAnTZGVlUP6VqhLujXpHJE  
 
 
原文: RSA密码交换算法
私钥加密后：hysMYn8EDH+eMqV18hIsVoH37hBxinCzRVfg5CIVvl1+lBHG8Std3orsab8T8sxe6m322O7yCoVUGUHhdRzsSQ==
公钥解密后：RSA密码交换算法
 
 
原文:乙方向甲方发送数据RSA算法
公钥加密后：gSuUQlAl0AfXHWmy0+qzNIrKXnjY+lg8FGgp1osPMoPnXR2oD1/fPRUy39pMVwbpLlb/+4CGTsERYARUG3gNZA==
私钥解密后：乙方向甲方发送数据RSA算法
```

前端的rsa请参看[js/rsa](../js/rsa.md)
