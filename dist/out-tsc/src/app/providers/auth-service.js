var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppSettings } from "../constants/constants";
var ApiAuthService = /** @class */ (function () {
    function ApiAuthService(http) {
        this.http = http;
        // httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json" })};
        this.url = AppSettings.API_ENDPOINT;
    }
    ApiAuthService.prototype.login = function (credentials, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var options = {
                headers: new HttpHeaders({ "Content-Type": "application/json" })
            };
            _this.http.post(_this.url + type, JSON.stringify(credentials), options)
                .subscribe(function (res) {
                resolve(res);
                console.log("auth-service works!");
                console.log(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    ApiAuthService.prototype.logout = function (params) {
        return this.http.post(this.url + "logout", params);
    };
    ApiAuthService = __decorate([
        Injectable({
            providedIn: "root"
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ApiAuthService);
    return ApiAuthService;
}());
export { ApiAuthService };
//# sourceMappingURL=auth-service.js.map