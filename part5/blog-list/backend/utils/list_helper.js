const dummy = (blogs) => {
    return 1
}

const calculateTotalLikes = (blogs) => {
    return blogs.reduce((likesSum, blog) => likesSum + blog.likes, 0)
}

const determineFavoriteBlog = (blogs) => {
    return blogs.length === 0
        ? null
        : blogs.reduce(
              (mostLikedBlog, blog) =>
                  blog.likes > mostLikedBlog.likes ? blog : mostLikedBlog,
              blogs[0]
          )
}

module.exports = {
    dummy,
    calculateTotalLikes,
    determineFavoriteBlog
}
