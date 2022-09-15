
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.employeesData = exports.FullTimeEmployee = exports.PartTimeEmployee = void 0;
var Employee = /** @class */ (function () {
    function Employee(firstname, lastname, email, overTime, absence, position, leaves, dataAdded) {
        var _this = this;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.position = position;
        this.hourlyRate = 20;
        this.allotedLeaves = 2;
        this.paidDays = 5;
        this.getName = function () {
            return "".concat(_this.firstname, " ").concat(_this.lastname);
        };
        this.getEmail = function () {
            return "".concat(_this.email);
        };
        this.getPosition = function () {
            return "".concat(_this.position);
        };
        this.updateInfo = function (data) {
            _this.firstname = data.firstname;
            _this.lastname = data.lastname;
            _this.email = data.email;
            _this.position = data.position;
        };
    }
    return Employee;
}());
//-----------------------------------PART TIME EMPLOYEE---------------------------
var PartTimeEmployee = /** @class */ (function (_super) {
    __extends(PartTimeEmployee, _super);
    function PartTimeEmployee(firstname, lastname, email, overTime, absence, position, leaves, dateAdded) {
        var _this = _super.call(this, firstname, lastname, email, overTime, absence, position, leaves, dateAdded) || this;
        _this.overTime = overTime;
        _this.absence = absence;
        _this.leaves = leaves;
        _this.dateAdded = dateAdded;
        _this.workingHours = 4;
        _this.weeklyTotalOT = 10;
        _this.addBonus = 10;
        _this.employeeType = 'Part-Time';
        _this.computeSalary = function () {
            var totalHours = _this.getTotalHours();
            var salary = totalHours * _this.hourlyRate;
            if (totalHours > 25)
                salary += _this.addBonus; // add bonus
            return salary;
        };
        _this.getTotalHours = function () {
            var totalAbsence = _this.absence - _this.leaves;
            var totalPaidDays = _this.paidDays - totalAbsence;
            var totalHours = totalPaidDays * _this.workingHours;
            return totalHours + Math.min(_this.overTime, _this.weeklyTotalOT);
        };
        PartTimeEmployee.empCount++;
        return _this;
    }
    PartTimeEmployee.empCount = 0;
    PartTimeEmployee.getEmployeeCount = function () {
        return PartTimeEmployee.empCount;
    };
    return PartTimeEmployee;
}(Employee));
exports.PartTimeEmployee = PartTimeEmployee;
//-----------------------------------FULL TIME EMPLOYEE---------------------------
var FullTimeEmployee = /** @class */ (function (_super) {
    __extends(FullTimeEmployee, _super);
    function FullTimeEmployee(firstname, lastname, email, overTime, absence, position, leaves, dateAdded) {
        var _this = _super.call(this, firstname, lastname, email, overTime, absence, position, leaves, dateAdded) || this;
        _this.overTime = overTime;
        _this.absence = absence;
        _this.leaves = leaves;
        _this.dateAdded = dateAdded;
        _this.workingHours = 8;
        _this.weeklyTotalOT = 20;
        _this.addBonus = 50;
        _this.leaveBonus = 10;
        _this.employeeType = 'Full-Time';
        _this.computeSalary = function () {
            var leavesLeft = Math.max(_this.allotedLeaves - _this.leaves, 0);
            var totalHours = _this.getTotalHours();
            var salary = totalHours * _this.hourlyRate;
            if (totalHours > 50)
                salary += _this.addBonus; // add bonus
            return salary + (leavesLeft * _this.leaveBonus); // add remaining leaves
        };
        FullTimeEmployee.empCount++;
        return _this;
    }
    FullTimeEmployee.prototype.getTotalHours = function () {
        var totalAbsence = this.absence - this.leaves;
        var totalPaidDays = this.paidDays - totalAbsence;
        var totalHours = totalPaidDays * this.workingHours;
        return totalHours + Math.min(this.overTime, this.weeklyTotalOT);
    };
    FullTimeEmployee.empCount = 0;
    FullTimeEmployee.getEmployeeCount = function () {
        return FullTimeEmployee.empCount;
    };
    return FullTimeEmployee;
}(Employee));
exports.FullTimeEmployee = FullTimeEmployee;
var addFullTimeEmp1 = new FullTimeEmployee('Jojo', 'Elliot', 'jojo@gmail.com', 20, 0, 'HR', 0, 'Sep 14, 22');
var addFullTimeEmp2 = new FullTimeEmployee('Cameron', 'Diaz', 'cameron@gmail.com', 12, 3, 'Unit Manager', 3, 'Sep 14, 22');
var addFullTimeEmp3 = new FullTimeEmployee('Coco', 'Melon', 'coco@gmail.com', 2, 0, 'Deployment Specialist', 0, 'Sep 14, 22');
var addFullTimeEmp4 = new FullTimeEmployee('Jen', 'Lisa', 'jen@gmail.com', 0, 0, 'Developer', 0, 'Sep 14, 22');
var addFullTimeEmp5 = new FullTimeEmployee('Goda', 'Cheese', 'goda@gmail.com', 8, 2, 'Solutions Designer', 2, 'Sep 14, 22');
var addPartTimeEmp1 = new PartTimeEmployee('Corn', 'Main', 'corn@gmail.com', 10, 0, 'QA Engineer', 0, 'Sep 14, 22');
var addPartTimeEmp2 = new PartTimeEmployee('Java', 'Script', 'java@gmail.com', 0, 0, 'Cloud Support', 0, 'Sep 14, 22');
var addPartTimeEmp3 = new PartTimeEmployee('Type', 'Script', 'type@gmail.com', 0, 5, 'Architect', 0, 'Sep 14, 22');
var addPartTimeEmp4 = new PartTimeEmployee('Marie', 'Mar', 'marie@gmail.com', 8, 0, 'Field Operator', 0, 'Sep 14, 22');
var addPartTimeEmp5 = new PartTimeEmployee('Mads', 'Mitchell', 'mads@gmail.com', 2, 3, 'Solutions Designer', 2, 'Sep 14, 22');
exports.employeesData = [
    addPartTimeEmp1,
    addPartTimeEmp2,
    addPartTimeEmp3,
    addPartTimeEmp4,
    addPartTimeEmp5,
    addFullTimeEmp1,
    addFullTimeEmp2,
    addFullTimeEmp3,
    addFullTimeEmp4,
    addFullTimeEmp5
];
