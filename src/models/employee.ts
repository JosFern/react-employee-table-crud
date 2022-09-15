abstract class Employee {
    protected readonly hourlyRate: number = 20
    protected readonly allotedLeaves: number = 2
    protected readonly paidDays: number = 5
    abstract workingHours: number
    abstract weeklyTotalOT: number
    abstract addBonus: number
    abstract employeeType: string

    constructor(private firstname: string, private lastname: string, private email: string, overTime: number, absence: number, private position: string, leaves: number, dataAdded: string) {
    }

    abstract computeSalary(): number
    abstract getTotalHours(): number

    getName = (): string => {
        return `${this.firstname} ${this.lastname}`
    }

    getEmail = (): string => {
        return `${this.email}`
    }
    getPosition = (): string => {
        return `${this.position}`
    }

    updateInfo = (data: any): void => {
        this.firstname = data.firstname
        this.lastname = data.lastname
        this.email = data.email
        this.position = data.position
    }
}

//-----------------------------------PART TIME EMPLOYEE---------------------------
export class PartTimeEmployee extends Employee {
    private static empCount = 0;

    readonly workingHours: number = 4
    readonly weeklyTotalOT: number = 10
    readonly addBonus: number = 10
    readonly employeeType: string = 'Part-Time'

    constructor(firstname: string, lastname: string, email, readonly overTime: number, readonly absence: number, position: string, readonly leaves: number, readonly dateAdded: string) {
        super(firstname, lastname, email,  overTime, absence, position, leaves, dateAdded);

        PartTimeEmployee.empCount++;
    }

    computeSalary = (): number => {
        const totalHours = this.getTotalHours()

        let salary = totalHours * this.hourlyRate

        if (totalHours > 25) salary += this.addBonus // add bonus
        
        return salary
    }

    getTotalHours = (): number => {
        const totalAbsence = this.absence - this.leaves;

        const totalPaidDays = this.paidDays - totalAbsence

        const totalHours = totalPaidDays * this.workingHours

        return totalHours + Math.min(this.overTime, this.weeklyTotalOT)
    }

    static getEmployeeCount = (): number => {
        return PartTimeEmployee.empCount
    }
}

//-----------------------------------FULL TIME EMPLOYEE---------------------------
export class FullTimeEmployee extends Employee {
    private static empCount = 0;

    readonly workingHours: number = 8
    readonly weeklyTotalOT: number = 20
    readonly addBonus: number = 50
    readonly leaveBonus: number = 10
    readonly employeeType: string = 'Full-Time'


    constructor(firstname: string, lastname: string, email: string, readonly overTime: number, readonly absence: number, position: string, readonly leaves: number, readonly dateAdded: string) {
        super(firstname, lastname, email, overTime, absence, position, leaves, dateAdded);

        FullTimeEmployee.empCount++;
    }

    computeSalary = (): number => {
        const leavesLeft = Math.max(this.allotedLeaves - this.leaves, 0)

        const totalHours = this.getTotalHours()

        let salary = totalHours * this.hourlyRate

        if (totalHours > 50) salary += this.addBonus // add bonus
        
        return salary + (leavesLeft * this.leaveBonus) // add remaining leaves
    }

    getTotalHours(): number {
        const totalAbsence = this.absence - this.leaves;

        const totalPaidDays = this.paidDays - totalAbsence

        const totalHours = totalPaidDays * this.workingHours

        return totalHours + Math.min(this.overTime, this.weeklyTotalOT)
    }

    static getEmployeeCount = (): number => {
        return FullTimeEmployee.empCount
    }
}

const addFullTimeEmp1 = new FullTimeEmployee('Jojo', 'Elliot', 'jojo@gmail.com', 20, 0, 'HR', 0, 'Sep 14, 22')
const addFullTimeEmp2 = new FullTimeEmployee('Cameron', 'Diaz', 'cameron@gmail.com', 12, 3, 'Unit Manager', 3, 'Sep 14, 22')
const addFullTimeEmp3 = new FullTimeEmployee('Coco', 'Melon', 'coco@gmail.com', 2, 0, 'Deployment Specialist', 0, 'Sep 14, 22')
const addFullTimeEmp4 = new FullTimeEmployee('Jen', 'Lisa','jen@gmail.com', 0,  0, 'Developer', 0, 'Sep 14, 22')
const addFullTimeEmp5 = new FullTimeEmployee('Goda', 'Cheese', 'goda@gmail.com', 8, 2, 'Solutions Designer', 2, 'Sep 14, 22')

const addPartTimeEmp1 = new PartTimeEmployee('Corn', 'Main', 'corn@gmail.com', 10, 0, 'QA Engineer', 0, 'Sep 14, 22')
const addPartTimeEmp2 = new PartTimeEmployee('Java', 'Script', 'java@gmail.com', 0, 0, 'Cloud Support', 0, 'Sep 14, 22')
const addPartTimeEmp3 = new PartTimeEmployee('Type', 'Script', 'type@gmail.com', 0, 5, 'Architect', 0, 'Sep 14, 22')
const addPartTimeEmp4 = new PartTimeEmployee('Marie', 'Mar', 'marie@gmail.com', 8, 0, 'Field Operator', 0, 'Sep 14, 22')
const addPartTimeEmp5 = new PartTimeEmployee('Mads', 'Mitchell', 'mads@gmail.com', 2, 3, 'Solutions Designer', 2, 'Sep 14, 22')

export const employeesData = [
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
]