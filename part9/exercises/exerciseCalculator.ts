interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
