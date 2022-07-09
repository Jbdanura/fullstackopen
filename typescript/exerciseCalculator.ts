export interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

/*const parseArguments = (args: Array<string>): Array<number> => {
    if(args.length < 3) throw new Error("Not enough arguments");
    const result = [];
    for(let i = 2; i < args.length; i++){
        if(isNaN(Number(args[i]))) throw new Error("Not a number");
        result.push(Number(args[i]));
    }
    return result;

};*/

export function calculateExercises(week: Array<number>, target: number): Result{
    let sum = 0;
    for(let i = 0; i < week.length; i++){
        sum += week[i];
    }
    const result : Result = {
        periodLength: week.length,
        trainingDays: week.filter(day => day > 0).length,
        success: sum >= target,
        rating: sum >= target * 1.5 ? 3 : sum >= target ? 2 : 1,
        ratingDescription: "3 = Excelent, 2 = Good, 1 = Bad",
        target: target,
        average: sum / week.length
    };
    return result;
}

/*try{
    const week = parseArguments(process.argv);
    console.log(calculateExercises(week,7));
} catch(error){
    console.log(error);
}*/
