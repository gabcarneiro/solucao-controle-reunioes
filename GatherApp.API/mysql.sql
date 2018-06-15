CREATE DATABASE gatherApp;

USE gatherApp;

CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON * . * TO 'appuser'@'localhost';

CREATE TABLE `__EFMigrationsHistory` (
    `MigrationId` varchar(95) NOT NULL,
    `ProductVersion` varchar(32) NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
);

CREATE TABLE `Users` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Department` longtext,
    `LastName` longtext,
    `Name` longtext,
    `PasswordHash` longblob,
    `PasswordSalt` longblob,
    `Username` longtext,
    CONSTRAINT `PK_Users` PRIMARY KEY (`Id`)
);

CREATE TABLE `Values` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Name` longtext,
    CONSTRAINT `PK_Values` PRIMARY KEY (`Id`)
);

CREATE TABLE `Meetings` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Description` longtext,
    `FinishingTime` datetime(6) NOT NULL,
    `StartingTime` datetime(6) NOT NULL,
    `UserId` int,
    CONSTRAINT `PK_Meetings` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Meetings_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE NO ACTION
);

CREATE INDEX `IX_Meetings_UserId` ON `Meetings` (`UserId`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20180603223525_mysqlinitialcreate', '2.0.2-rtm-10011');

