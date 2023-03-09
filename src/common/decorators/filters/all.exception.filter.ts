import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllExceptionFilters implements ExceptionFilter{
    constructor(private readonly httpAdapterHost:HttpAdapterHost){}
    catch(exception:unknown, host:ArgumentsHost):void{
        const {httpAdapter}=this.httpAdapterHost;
        const ctx=host.switchToHttp();
        const httpStatus=exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR
        const resBody={
            statusCode:httpStatus,
            timestamp:new Date().toISOString(),
            path:httpAdapter.getRequestUrl(ctx.getRequest())
        }
        console.log(exception);
        httpAdapter.reply(ctx.getResponse(), resBody, httpStatus);
    }
}