#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
//define student class
class Student {
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.course = [];
        this.balance = 400;
    }
    //method to enroll a student in a course
    enroll_course(course) {
        this.course.push(course);
    }
    //method to view a student balance 
    view_balance() {
        console.log(chalk_1.default.black.bgGrey(`\nBalance for ${this.name}
             ===>  $${this.balance}`));
    }
    //method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk_1.default.black.bgGray(`\n$${amount} Fees paid sucessfully for
             ===> ${this.name}`));
        console.log(chalk_1.default.black.bgGreen(`\nRemaining Balance $${this.balance}`));
    }
    //method to display student status
    show_status() {
        console.log(chalk_1.default.black.bgRedBright(`\n--ID : ${this.id}`));
        console.log(chalk_1.default.black.bgRedBright(`\n--Name : ${this.name}`));
        console.log(chalk_1.default.black.bgRedBright(`\n--Courses : ${this.course}`));
        console.log(chalk_1.default.black.bgRedBright(`\n--Balance: $${this.balance}`));
    }
}
Student.counter = 5000;
//define a student manager class to manage students
class Student_manager {
    constructor() {
        this.students = [];
    }
    //method to add a student 
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk_1.default.black.bgGray(`\nStudent: ${name} added successfully! 
                ===> Student ID: ${student.id}`));
    }
    //method to enroll student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk_1.default.black.bgGray(`\n${student.name} enrolled in ${course} successfully !`));
        }
    }
    //method to view student balanc
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk_1.default.black.bgWhite("\n>>> Student not found . Please enter a correct student ID!"));
        }
    }
    //method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk_1.default.black.bgWhite("\n>>> Student not found . Please enter a correct student ID!"));
        }
    }
    //method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log(chalk_1.default.black.bgWhite("\n>>> Student not found . Please enter a correct student ID"));
        }
    }
    //method to find a student 
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
//main function to run program
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk_1.default.yellow("_".repeat(70)));
        console.log(chalk_1.default.black.bgBlueBright("\n\tWelcome to Mrs Babar - Student Management System"));
        console.log(chalk_1.default.yellow("_".repeat(70)));
        let student_manager = new Student_manager();
        //while loop to keep program running
        while (true) {
            let choice = yield inquirer_1.default.prompt([{
                    name: "choice",
                    type: "list",
                    message: "Select an option",
                    choices: [
                        "Add Student",
                        "Enroll Student",
                        "View Student Balance",
                        "Pay Fees",
                        "Show Status",
                        "Exit"
                    ]
                }
            ]);
            //using switch - case statement for user choice
            switch (choice.choice) {
                case "Add Student":
                    let name_input = yield inquirer_1.default.prompt([
                        {
                            name: "name",
                            type: "input",
                            message: chalk_1.default.black.bgBlue("\nEnter a student name")
                        }
                    ]);
                    student_manager.add_student(name_input.name);
                    break;
                case "Enroll Student":
                    let course_input = yield inquirer_1.default.prompt([
                        {
                            name: "student_id",
                            type: "number",
                            message: chalk_1.default.black.bgBlue("\nEnter a Student ID"),
                        },
                        {
                            name: "course",
                            type: "input",
                            message: chalk_1.default.black.bgBlue("\nEnter a Course Name"),
                        }
                    ]);
                    student_manager.enroll_student(course_input.student_id, course_input.course);
                    break;
                case "View Student Balance":
                    let balance_input = yield inquirer_1.default.prompt([
                        {
                            name: "student_id",
                            type: "number",
                            message: chalk_1.default.black.bgBlue("\nEnter a student ID"),
                        }
                    ]);
                    student_manager.view_student_balance(balance_input.student_id);
                    break;
                case "Pay Fees":
                    let fees_input = yield inquirer_1.default.prompt([
                        {
                            name: "student_id",
                            type: "number",
                            message: chalk_1.default.black.bgBlue("\nEnter a Student ID"),
                        },
                        {
                            name: "amount",
                            type: "number",
                            message: chalk_1.default.black.bgBlue("\nEnter amount to pay")
                        }
                    ]);
                    student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                    break;
                case "Show Status":
                    let status_input = yield inquirer_1.default.prompt([
                        {
                            name: "student_id",
                            type: "number",
                            message: chalk_1.default.black.bgBlue("\nEnter a student ID")
                        }
                    ]);
                    student_manager.show_student_status(status_input.student_id);
                    break;
                case "Exit":
                    console.log(chalk_1.default.black.bgCyanBright("\n....Exiting...."));
                    process.exit();
            }
        }
    });
}
//calling a main function
main();
