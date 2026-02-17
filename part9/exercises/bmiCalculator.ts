interface BmiInputs {
    height: number
    weight: number
}

const parseArguments = (args: string[]): BmiInputs => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const calculateBmi = (height: number, weight: number): number => {
    if (height === 0) throw new Error("Can't divide by 0")
    return weight / Math.pow(height / 100, 2)
}

try {
    const { height, weight } = parseArguments(process.argv)
    const bmi = calculateBmi(height, weight)

    console.log('bmi:', bmi)

    if (bmi <= 18.5) {
        console.log('Underweight range')
    } else if (bmi > 18.5 && bmi < 24.9) {
        console.log('Normal range')
    } else if (bmi >= 24.9 && bmi < 30) {
        console.log('Overweight range')
    } else {
        console.log('Obese range')
    }
} catch (error: unknown) {
    let errorMessage = 'An error occurred: '
    if (error instanceof Error) {
        errorMessage += error.message
    }
    console.log(errorMessage)
}
