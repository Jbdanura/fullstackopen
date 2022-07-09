export interface Values {
    height : number,
    weight: number
}

/*const getValues = (args: Array<string>): Values => {
    if(args.length < 2) throw new Error("Not enough arguments");
    if(args.length > 4) throw new Error("Too many arguments");
    if(isNaN(Number(args[2])) || isNaN(Number(args[3]))) throw new Error("Only numbers");
    const result : Values = {
        height: Number(args[2]),
        weight: Number(args[3])
    };
    return result;
};*/

export function calculateBmi(values: Values): string{
    const bmi = values.weight / ((values.height / 100) ** 2);
    if(bmi >= 25){
        return "You are fucking obese";
    } else if (bmi < 25 && bmi >= 18.5 ){
        return "You are at a healthy weight";
    } else{
        return "Eat something bro";
    }
}

/*try {
    const values : Values = getValues(process.argv);
    console.log(calculateBmi(values));
} catch (error) {
    console.log(error);
}*/
