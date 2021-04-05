module.exports={

    retry_strategy:function (options){

        if (options.error && options.error.code === "ECONNREFUSED") {

            // 연결을 종료할만한 에러를 이런 방식으로 기술할 수 있다.
            // 여기서는 일단 connection refused 라는 에러가 발생하면 그냥 종료 시키는 걸로
            return new Error("The server refused the connection");
        }

        if (options.total_retry_time > 1000 * 60 * 60) {

            // 재시작을 시도한 시간이 1시간이 넘으면, 종료한다.
            return new Error("Retry time exhausted");
        }
        if (options.attempt > 10) {
            // 재시작 시도횟수가 10번이 넘으면 끝낸다.
            return undefined;
        }
        return Math.min(options.attempt * 100, 3000);

    }
}