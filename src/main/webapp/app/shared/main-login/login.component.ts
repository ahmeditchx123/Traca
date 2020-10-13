import { Component, AfterViewInit, Renderer, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { AccountService, LoginModalService } from 'app/core';
import { EMAIL_NOT_FOUND_TYPE } from 'app/shared';
import { PasswordResetFinishService, PasswordResetInitService } from 'app/account';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-main-login-modal',
    templateUrl: './login.component.html',
    styleUrls: ['./login.css']
})
export class JhiLoginComponent implements OnInit, AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    error: string;
    errorEmailNotExists: string;
    resetAccount: any;
    success: boolean;
    confirmPassword: string;
    doNotMatch: string;
    keyMissing: boolean;
    resetSuccess: string;
    modalRef: NgbModalRef;
    key: string;

    auth = true;
    reset = false;
    email = false;

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private accountService: AccountService,
        private renderer: Renderer,
        private router: Router,
        private passwordResetInitService: PasswordResetInitService,
        private passwordResetFinishService: PasswordResetFinishService,
        private loginModalService: LoginModalService,
        private route: ActivatedRoute
    ) {
        this.credentials = {};
    }

    ngAfterViewInit() {
        setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
    }

    cancel() {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.accountService.hasAuthority('ROLE_ADMIN').then(isAdmin => {
                    if (!isAdmin) {
                        this.router.navigateByUrl('/client');
                    } else {
                        if (
                            this.router.url === '/register' ||
                            /^\/activate\//.test(this.router.url) ||
                            /^\/reset\//.test(this.router.url)
                        ) {
                            this.router.navigate(['']);
                        }

                        this.eventManager.broadcast({
                            name: 'authenticationSuccess',
                            content: 'Sending Authentication Success'
                        });

                        // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                        // since login is successful, go to stored previousState and clear previousState
                        const redirect = this.stateStorageService.getUrl();
                        if (redirect) {
                            this.stateStorageService.storeUrl(null);
                            this.router.navigate([redirect]);
                        }
                    }
                });
                this.authenticationError = false;
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }

    ngOnInit() {
        this.resetAccount = {};
        this.route.queryParams.subscribe(params => {
            this.key = params['key'];

            this.keyMissing = !this.key;

            if (!this.keyMissing) {
                this.auth = false;
                this.reset = true;
                this.email = false;
            }
        });
        this.resetAccount = {};
    }

    back() {
        this.auth = true;
        this.reset = false;
        this.email = false;
    }

    resetForm() {
        this.auth = false;
        this.reset = false;
        this.email = true;
    }

    requestReset() {
        this.error = null;
        this.errorEmailNotExists = null;
        this.passwordResetInitService.save(this.resetAccount.email).subscribe(
            () => {
                this.success = true;
            },
            response => {
                this.success = false;
                if (response.status === 400 && response.error.type === EMAIL_NOT_FOUND_TYPE) {
                    this.errorEmailNotExists = 'ERROR';
                } else {
                    this.error = 'ERROR';
                }
            }
        );
    }

    finishReset() {
        this.doNotMatch = null;
        this.error = null;
        if (this.resetAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.passwordResetFinishService.save({ key: this.key, newPassword: this.resetAccount.password }).subscribe(
                () => {
                    this.resetSuccess = 'OK';
                },
                () => {
                    this.resetSuccess = null;
                    this.error = 'ERROR';
                }
            );
        }
    }
}
