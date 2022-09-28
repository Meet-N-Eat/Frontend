export function reviewStars(reviews) {
    if(!reviews) return
    const starsArr = reviews.map(review => review.stars)
    let sum, avg, avgRound
    sum = starsArr.reduce((a, b) => a + b, 0)
    avg = sum / reviews.length
    avgRound = avg.toString().split('.')
    console.log(avgRound)
    console.log(sum)
    let decimal = avgRound[1].split('')
    if(decimal[0] < 2) {
        return avgRound[0]
    } else if(decimal[0] >= 3 && decimal[0] <= 7) {
        return avgRound[0] + '5'
    } else {
        let number = parseInt(avgRound[0])
        return number += 1
    }
    

    
    return
}