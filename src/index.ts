console.log('Hello, TypeScript Course!');

let age: number= 2;
if (age < 15)
    age += 10;
console.log(age);

        // annotation and the type 'any'
let sales: number= 123_456_789;
let course: string= "Typescript"
let is_published: boolean = true

        //understanding arrays in ts and use of intelliSense
let number: number[] = []
let numbers= number.forEach(n => n.toFixed)

        //understanding tuples in ts and use of intelliSense
let user: [number, string] = [1, 'Ore'];
user[1].concat('Olu');

        // understanding enums in ts
const small= 1
const medium= 2
const large= 3

enum size {Small, Medium, Large} //we just added members of the 'size' enum. 
                                    // by default, ts makes the values of the member start from 0 to 1,2... you'll see it if you hover on it
                                        //or you can specify values yourself
const enum sizeSpecified {Small=3, Medium=6, Large= 9}

let mySize: sizeSpecified= sizeSpecified.Medium 
console.log(mySize);

        //functions in ts
function calculateTax(income: number){
    return 0
}           //doing this, ts will infer the return type of the function to be 'number' since you put the return '0'
            //but it's always better to specify the return type of the function (annotation), in the above, we only annotated the parameter

function calculateTax2(income: number, taxYear?: number): number{
    if (income < 50_000)
        // return income * 1.2;
    //ts would have an issue with the above line because in JS, the default value of a function is 'undefined' so if the income>50_000, it will return 'undefined' which is not a number. TS will have an issue with this. that's why it gives the error
        return income * 1.2;

    if (taxYear < 2022) //the reason the taxYear is underlined here is cuz typescript is warning us that it since you have stated in the function argument that it is optional to put the taxYear (by putting ?) it is possible tha no one puts it but we need it in the code, and it will return undefined. And you can't compute 'number' calculations with an undefined value
        if( ( taxYear || 2022 )<2022) //i wrote this line again to show you how to get rid of the error shown on the top line. you just provide a value to use incase the taxYear argument is undefined
            return  income * 1.5;
    return income / 1.1;
}

//showing an even better way (apart from that one above) to ensure that an optional argument does not end up giving a value of undefined
function calculateTax3(income: number, taxYear=2000): number{  //here we did not explicitly say that the taxYear is an optional argument (by putting '?'), we just put a defualt value but that directly means if you don't put any value, the code is fine. meaning it is an optional value
    if (taxYear <2000)
        return income * 2;
    return income * 1.5;

}

        //OBJECTS IN TS 
let employee = {id: 1} //no error is raised here from a lack of annotation cuz ts infers that the type of 'id' is number since we gave a number
employee.name= 'Mosh' //we made the object 'employee' and gave it only the property 'id'. In js, objects can always add new properties as described in subsequent code without giving an error. so this line where we just gave a value to the name property that wasn't earlier defined would not be an issue. but in ts, you have to have earlier stated the property

let employee1:{
    id:number, 
    name: string} = {id: 1} //now this 'employee1 variable gives the error: Property 'name' is missing in type '{ id: number; }' but required in type '{ id: number; name: string; }'. this is because ts expects that ALL annotated variable will be shown/written on every time the object is editted. but we only editted 'id' here
employee1.name= 'Mosh'

//to fix the above error, we set 'name' to optional
let employee2:{
    id:number, 
    name?: string} = {id: 1}//so the absence of a name here does not cause an error. Practically tho, this should be avoided since every employee must have a name. So if you are coding and you are just not yet in the part of the code where the employee's name is to be inputted, just set name to empty string first 
employee1.name= 'Mosh'

//you could also do this code (more practical, See explanation in last comment)
let employee3:{
    id:number, 
    name: string} = {id: 1, name: ''}
employee1.name= 'Mosh'


//to make a specific property unchangeable
let employee4:{
    readonly id:number, 
    name: string} = {id: 1, name: ''}
employee1.name= 'Mosh'
 
//how to redefine a method in this object (recall, a method is basically a function used (and defined) by an object)
let employee5:{
    readonly id:number, 
    name: string, 
    retire: (date: Date) => void   //we initilaized the method
} = {
    id: 1, 
    name: '', 
    retire: (date: Date)=>{
    console.log(date)
}} 
employee1.name= 'Mosh'

        //Using Type aliases
//type alias, as the name suggests, is the alias or 'name' we give specifying type details. so we don't have to write all those type details again when making new variables/objects/arrays/anything that should have that type
//notice in 'employee5' the code is starting to look bulky since we are first annotoating the types before we now fill the property details with the data
type Employee= {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
}

let employee6: Employee = {
    id: 1, 
    name: '', 
    retire: (date: Date)=>{
    console.log(date)
}} 
employee1.name= 'Mosh'

        //UNION TYPES
//these are used to give a variable multiple types. it is created using |

function kgToLbs(weight: number | string): number {
    weight //here, if you put a dot, VS code only gives you methods common to both string and number so we do a tachnique called 'narrowing' to specify the type we are wokring with and get all the methods available for that type
    //Narrowing
    if (typeof weight === 'number'){
        return weight * 2.2
    }
    else{
        return parseInt(weight) * 2.2
    }
}

kgToLbs(10)
kgToLbs('10kg') //now neither of these give an error 

    //another type of making union types. 
//first we make two separate types and join themin one type
type Draggable ={
    drag : ()=> void,
}

type Resizable= {
    resize : ()=> void
}

type UIWidget = Draggable & Resizable

//since we have them joined, you can use either function that was defined in the objects without error
let textBox: UIWidget ={
    drag: ()=>{},
    resize: ()=>{}
}

        //USING LITERAL TYPES
//this is used to limit the values that can be assigned to a variable. 
let quantity: 50 | 100 = 50

//what if we have a longer set of values we only want? you use a type alias
type Quantity= 50 | 100 | 56 | 87 | 23   //got confused with what to put here a bit, just know that whatever yo uuse to annotate is exactly what you'll put after the '=' in the alias
let quantity1: Quantity = 87;


        //WORKING WITH NULL VALUES
//ts wil prevent an unintntional provision of 'null' into the code, which would cause a crash so we have to explictly annotate it and say what to do with the null
function greet(name: string | null) {
    if (name) // no need to say if (typeof name=== 'string') as we did before since it the value if 'null' it simple means there is no 'name'. therefore, it's right to base the if statement on whether 'name' exists/has a value
        console.log(name.toUpperCase);
    else
        console.log('Ola')
}
greet(null)


type Customer= {
    birthday: Date
}

function getCustomer(id: number): Customer | null | undefined {
    return id === 0 ? null : {birthday: new Date() }
}

let customer = getCustomer(0)
if (customer != null && customer != undefined)
    console.log(customer.birthday)  //wihtout the 'if' statement, ts will give an error in this line since customer is possibly a null or undefined. you have to handle that

//a better way to hande the above case where only want the console.log to run ONLY IF customer isn't null or undefined
let customer1 = getCustomer(0)
console.log(customer1?.birthday) //this will give 'null' since we have told the code not to run if customer1 isn't there

//SO FAR, seeinf '?' means 2 things depending on where it is in the code. If it is in the annotation, then that variable is an optional one. If it is in the normal line of code, maybe in a function or method, it means that piece of code will get executed only if that variable is present (ie not null or undefined)
