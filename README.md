## grocery_store

상점 또는 유저가 되어서 서비스를 사용할 수 있다.  
상점에는, 여러명의 직원이 등록될 수 있으며, 상점으로 주문이 들어올 시, 알람 메시지를 받을 수가 있다.
포인트를 통해 결제할 수 있다.
상점을 가입하게 되면, 이미지를 등록해야만 한다.


유저는 상점을 이용할 수 있다. 물건을 구매하게 되면, 포인트가 차감되고, 해당 품목에 대한 영수증을
메일로 발급받게 된다. 구매한 품목들에 대한 리스트를 볼수있다. 
상품에 대한 후기를 남길 수가 있다.   
물건을 찜 할 수가 있고 확인 할 수 있다. 

### was
* ngix

### front-end
* handlebars

### back-end
* nodejs

### image storage
* s3  

### DB  
* aws rds  

### session storage
* redis

### hosting
* aws ec2

### sms server
* aws SNS
 
 
 
 
 ### 3.31 한일
 * passport 모듈에서 done(), serializeUser, deserializeUser 이해
 * redis 연결중
 * sequelize, instance 생성 및 data 저장, 테이블 생성
 
 
 ### 4.02
 * 레디스는 서버-자료구조 라고 한다. DB 자체가 자료구조 패키지 인것이다.
 * SET,
 * atomic operation, 레디스에서 사용하는 모든 증감 연산 및 데이터 수정에 대해서는  
 동시 접근을 염려할 필요가 없다고 한다.
 * Redis can be told that a key should only exist for a certain length of time. This is accomplished with the EXPIRE and TTL commands, and by the similar PEXPIRE and PTTL commands that operate using time in milliseconds instead of seconds.
 
  
  
```
    *Set

    // expire time 설정, seconds
    SET resource:lock "Redis Demo"
    EXPIRE resource:lock 120


    // expire time 만료 되면 -2
    TTL resource:lock => 113
    // after 113s
    TTL resource:lock => -2

    // expire time 이 설저이 언되있으면 -1 리턴
    SET resource:lock "Redis Demo 1"
    EXPIRE resource:lock 120
    TTL resource:lock => 119
    SET resource:lock "Redis Demo 2"
    TTL resource:lock => -1

    만료시간을 변경해줄 수도 있다.
    SET resource:lock "Redis Demo 3" EX 5
    TTL resource:lock => 5

    만료될 데이터를 영구적으로 바꿀 수도 있다.
    SET resource:lock "Redis Demo 3" EX 5
    PERSIST resource:lock
    TTL resource:lock => -1
```

```
*list
ADT
rpush : add element at the end of the list (from the right side), and you can even add multiple data at a time  
ex) lpush friends 1 2 3 4 "sam"

lpush
llen
lrange(from, end) it will return data between index that you give 
lpop(list) it will return the first data, removing it from the list  
rpop lpop(list) it will return the last data, removing it from the list

```

```
*set
it is similar to list, except the fact it doesnt' allow duplication and no order there

sadd(data) : to add data, if it returns 0 after you tried it, then it means the data you just tried are duplicated
srem(key|data) : remove data
smember([data]): to check if there is a given data, if you don't give a param then, it will show you data it has now
suinon(set, set): it merges given sets as params!
spop(number): randomly it will give you a number of items you gave as a parmas, and will remove the data from itself
srandmember(set, number): is simiar to spop but there is no remove of data   


*sorted set
actually set is the data structure that is not for sorting, but it provides sorting


    ZADD hackers 1940 "Alan Kay"
    ZADD hackers 1906 "Grace Hopper"
    ZADD hackers 1953 "Richard Stallman"
    ZADD hackers 1965 "Yukihiro Matsumoto"
    ZADD hackers 1916 "Claude Shannon"
    ZADD hackers 1969 "Linus Torvalds"
    ZADD hackers 1957 "Sophie Wilson"
    ZADD hackers 1912 "Alan Turing"


    ZRANGE hackers 2 4 => 1) "Claude Shannon", 2) "Alan Kay", 3) "Richard Stallman"

```

```
* HashMap


    HSET user:1000 name "John Smith"
    HSET user:1000 email "john.smith@example.com"
    HSET user:1000 password "s3cret"

    // HGETALL user:1000

    // hgetall user:1000
    1) "name"
    2) "john smith"
    3) "email"
    4) "john.smith@exmaple.com"
    5) "password"
    6) "s3cret" 
    
    // it is possible to set multiple data at a time
    HMSET user:1001 name "Mary Jones" password "hidden" email "mjones@example.com"

    get method
    HGET user:1001 name => "Mary Jones"

    HSET user:1000 visits 10
    HINCRBY user:1000 visits 1 => 11
    HINCRBY user:1000 visits 10 => 21
    HDEL user:1000 visits
    HINCRBY user:1000 visits 1 => 1




```

### 21.04.05
1. assert 는 단위테스트를 위한 모듈이다.
2. 저장된 데이터에, 만료시점을 주고 싶다.
