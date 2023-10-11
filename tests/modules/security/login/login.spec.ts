import { Page } from '@playwright/test';
import { Config } from "@tests/shared/environment-configuration";
import Login from './login.page';

const { test, expect } = require('@playwright/test');
const config = new Config();

async function userLogin(pg) {
        const login = new Login(pg); 
        pg.setDefaultTimeout(350000);
        await pg.goto(config.mediaclURL);
        await pg.goto(config.baseUrl);
        await login.performLogin(config.loginUser,config.loginPassword)
}

module.exports = {userLogin}
