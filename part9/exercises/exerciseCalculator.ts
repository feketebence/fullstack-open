interface TrainingInputs {
    dailyTarget: number
    hours: number[]
}

interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const parseTrainingArguments = (args: string[]): TrainingInputs => {
    if (args.length < 4)
        throw new Error(
            'Not enough arguments, the dailyTarget and at least one dailyHour value is needed.'
        )

    if (isNaN(Number(args[2]))) {
        throw new Error('Daily target (first arg) is not a number.')
    }

    for (let i = 3; i < args.length; i++) {
        if (isNaN(Number(args[i]))) {
            throw new Error(
                `The number of training hours '${args[i]}' for day ${i - 2} (args[${i}]) is not a number.`
            )
        }
    }

    return {
        dailyTarget: Number(args[2]),
        hours: args.slice(3).map((value) => Number(value))
    }
}

const calculateExercises = (
    exerciseHours: number[],
    dailyTarget: number
): Result => {
    const numberOfDays = exerciseHours.length

    const numberOfTrainingDays = exerciseHours.filter(
        (hour) => hour !== 0
    ).length

    const totalHours = exerciseHours.reduce(
        (accumulator, hour) => accumulator + hour,
        0
    )
    const dailyAverage = totalHours / numberOfDays

    const isTargetMet = dailyAverage >= dailyTarget ? true : false

    let rating = 0
    if (isTargetMet) {
        rating = 3
    } else if (dailyAverage > dailyTarget * 0.75) {
        rating = 2
    } else {
        rating = 1
    }

    let ratingDescription = ''
    switch (rating) {
        case 1:
            ratingDescription = 'you could do better'
            break
        case 2:
            ratingDescription = 'almost there! keep going'
            break
        case 3:
            ratingDescription = 'great scott! the target is met!!'
            break
    }

    return {
        periodLength: numberOfDays,
        trainingDays: numberOfTrainingDays,
        success: isTargetMet,
        rating: rating,
        ratingDescription: ratingDescription,
        target: dailyTarget,
        average: dailyAverage
    }
}

try {
    const { dailyTarget, hours } = parseTrainingArguments(process.argv)

    console.log(calculateExercises(hours, dailyTarget))
} catch (error: unknown) {
    let errorMessage = 'An error occurred.'
    if (error instanceof Error) {
        errorMessage += ' ' + error.message
    }
    console.log(errorMessage)
}
