const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    for (let i = 0; i < blogs.length; i++){
        total += blogs[i].likes
    }
    return total
}

const favoriteBlog = (blogs) => {
    let max = 0
    let blog
    for(let i = 0; i < blogs.length; i++){
        if(blogs[i].likes > max){
            blog = blogs[i]
            max = blogs[i].likes
        }
    }
    return blog
}

const mostBlogs = (blogs) => {
    let authors = {}
    let maxBlogs = 0
    let result = {}
    for(let i = 0; i < blogs.length; i++){
        const blog = blogs[i]
        const author = blog.author
        if(!authors.hasOwnProperty(author)){
            authors[author] = 1
        } else {
            authors[author] += 1
        }
        if(authors[author] > maxBlogs){
            maxBlogs = authors[author]
            result.author = author
            result.blogs = maxBlogs
        }
    }
    return result
}

const mostLikes = (blogs) => {
    let authors = {}
    let maxLikes = 0
    let result = {}
    for(let i = 0; i < blogs.length; i++){
        const blog = blogs[i]
        const author = blog.author
        const likes = blog.likes

        if(!authors.hasOwnProperty(author)){
            authors[author] = likes
        } else {
            authors[author] += likes
        }
        if(authors[author] > maxLikes){
            maxLikes = authors[author]
            result.author = author
            result.likes = maxLikes
        }
    }
    return result
}


module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}