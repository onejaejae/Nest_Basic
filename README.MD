### Express 싱글톤 패턴

---

<br>

안녕하세요!

아래는 싱글톤 패턴의 큰 장점 두 가지입니다.

1. 메모리 효율

2. 도메인 또는 프로그램에서 인스턴스가 절대적으로 한 개만 존재한다는 것을 보증 받습니다.

강의에서 Server라는 클래스는 하나의 인스턴스를 만들었습니다. 그리고 이 인스턴스는 고유하는 것을 보증 받습니다. 이 인스턴스는 프로그램에서 한 번만 사용되어야 하기 때문입니다. 애초에 여러 서버를 여는 것이 아니라는 것이 확실하기에 서버 인스턴스는 하나만 필요합니다. 이 경우, 다수의 Server 인스턴스를 찍어서 사용 하는 것은 복잡함을 야기하고 불필요합니다.

하나의 인스턴스만을 찍어내고 사용하는 것, 이것이 싱글톤 패턴입니다.

Node.js에서 모듈 캐싱으로 싱글톤 패턴에 의미가 없다는 것은

예를들어 import \* as express from "express"; 이 문장을 여러번 찍어도 캐싱이 되기 때문에 모듈을 import 하는 관점에서는 의미가 없다는 것입니다.

싱글톤 패턴은 소프트웨어 코드 작성에 있어 의미가 있습니다. 설령 메모리 효율에 있어서 장점이 없다 해도, 코드 디자인 측면에서 장점이 있다면 의미가 있습니다.

추가적으로 싱글톤 패턴이 항상 좋은 것은 아닙니다. 잘못 적용하면 SOLID 원칙에 위배 될 수 있습니다. 이로 인해 어떤 관점에서는 안티 패턴이 될 수 있습니다.

아주 분명한 경우에 적용하는 것이 맞습니다. 서버 실행과 같이 딱 한 번 사용됨을 보증 받아야 하는 경우가 바로 그것이죠. 그리고 대체적으로 프레임워크의 도움을 받는 것이 좋습니다. 뒤에 NestJS에서는 컨트롤러, 서비스 등 레이어가 딱 한 번 인스턴스를 만들어 사용되는 것을 보증받도록 만들어져 있습니다.

<br>

출처

https://www.inflearn.com/course/%ED%83%84%ED%83%84%ED%95%9C-%EB%B0%B1%EC%97%94%EB%93%9C-%EB%84%A4%EC%8A%A4%ED%8A%B8/lecture/83533?tab=community&volume=0.90&quality=1080&speed=1.25&q=363872

<br>

### 의존성 주입

---

<br>

https://kotlinworld.com/64

https://www.wisewiredbooks.com/nestjs/overview/04-provider.html

<br>

### 응집도와 결합도

---

<Br>

https://medium.com/@jang.wangsu/%EC%84%A4%EA%B3%84-%EC%9A%A9%EC%96%B4-%EC%9D%91%EC%A7%91%EB%8F%84%EC%99%80-%EA%B2%B0%ED%95%A9%EB%8F%84-b5e2b7b210ff

<br>

### pipe pattern

---

<br>

✔ pipe는 클라이언트 요청에서 들어오는 데이터를 유효성 검사 및 변환을 수행하여 서버가 원하는 데이터를 얻을 수 있도록 도와주는 클래스입니다.

<br>

<img src="https://user-images.githubusercontent.com/62149784/147855182-45062266-d2a4-4a51-87f1-fc7f25190e06.png">

<br>

### Mongoose virtual

---

<br>

https://www.zerocho.com/category/MongoDB/post/59a1870210b942001853e250

<br>

### jwt flow

---

<br>

<img src="https://user-images.githubusercontent.com/62149784/148414577-e14c7219-ed08-4a34-906b-27e3f1824b7c.jpg">

<br>

1. JWT가 헤더에 담겨서 request 요청을 보낸다.

2. JWT Guard가 실행이 되어 JWT Strategy가 실행이 된다(validate 실행).

3. JWT Strategy에서는 secret key를 통해서 디코딩을 하고 유효하다면 requset에 유저 정보를 담고 이후에 API를 처리한다.

<br>

### JwtAuthGuard가 Strategy를 어떻게 알고 실행하는건가요?

---

<br>

@UseGuard(JwtAuthGuard)로 데코레이팅된 컨트롤러가 실행되면 JwtAuthGuard는 자동으로 PassportStrategy를 상속받은 JwtStrategy를 찾아서 로직을 수행합니다.

여기서 JwtAuthGuard가 JwtStrategy를 찾을 수 있는 이유는 JwtStrategy는 AuthModule의 프로바이더로 등록이 되어 있고 "@nestjs/passport"의 내부 로직에 의해 PassportStrategy를 상속받은 전략 클래스(JwtStrategy)를 자동으로 찾아냅니다.

JwtAuthGuard는 AuthGuard("jwt") 즉, jwt 유형의 AuthGuard를 상속받은 클래스이기 때문에 PassportStrategy를 상속받은 여러가지 클래스 중에서(예를들어 로그인, 인증 방식에 따라 LocalStrategy, KakaoStrategy 등 여러가지로 정의될 수 있습니다.) passport-jwt의 Strategy를 인자로 받은 PassportStrategy를 상속받은 JwtStrategy을 찾는 것 입니다.

결론적으로 if (@UseGuard(JwtAuthGuard)로 데코레이팅된 컨트롤러가 실행)

1. JwtAuthGuard는 PassportStrategy를 상속받은 전략 클래스인 JwtStrategy를 찾는다. ("@nestjs/passport" 로직에 의해)

(단, 프로바이더에 등록 되어 있어야 합니다.)

2. JwtStrategy의 로직이 수행.

추가적으로 궁금하신 것 있으시면 답글 남겨주세요.

감사합니다. :)

<BR>

https://www.inflearn.com/course/%ED%83%84%ED%83%84%ED%95%9C-%EB%B0%B1%EC%97%94%EB%93%9C-%EB%84%A4%EC%8A%A4%ED%8A%B8/lecture/83833?tab=community&volume=1.00&quality=1080&speed=1.25&q=284442

<BR>

### Swagger API 보안 설정

---

<BR>

✔ 서비스를 배포했을 때, Swagger 문서가 노출되면 심각한 보안 문제를 초래할 수 있다.

https://www.npmjs.com/package/express-basic-auth
