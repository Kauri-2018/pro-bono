# pro-bono
## Introduction
Pro-bono is a web application created for the Auckland Community Law Centre by students of the Enspiral Dev Academy as their final project. It was made by a team of 4 ([Sarah McLaughlin](https://github.com/sarah-mclaughlin), [Cameron Probert](https://github.com/CameronProbert), [Kale Hembrow](https://github.com/meakommo) and [Zoe Barron](https://github.com/Zoealexandra)) over 7 days, with efforts being made to continue the project after the end of the Enspiral Dev Academy bootcamp.

## To Test
### Website
It is deployed on heroku - http://pro-bono-test.herokuapp.com

#### Logins
There are 3 default log ins - one for each priviledge level
**Lawyer**
Username: lawyer
Password: lawyer

**Member**
Username: member
Password: member

**Admin**
Username: admin
Password: admin

### Locally
#### For Linux
1. Clone from github using `git clone https://github.com/Kauri-2018/pro-bono.git`
2. Ensure __Node__ is running version 9.11.0 using `node -v`
  * If you have the wrong node version
    1. Install __nvm__ using `sudo apt install nvm`
    2. Run `nvm install 9.11.0` to install the correct node version, or if it already installed, run `nvm use 9.11.0`
3. Run `yarn` to install packages
  * If __Sodium__ does not build run `sudo apt install automake autoconf libtool`
4. Run the seed files for the database with `yarn knex seed:run`
  * If the database did not set up correctly for some reason run `yarn knex migrate:latest && yarn knex seed:run`
5. Start the server using `yarn start`
6. Connect to the server using the web browser of your choice at `localhost:3000`