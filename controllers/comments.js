const cloudinary = require("../middleware/cloudinary");
const Comments = require("../models/Comments");

module.exports = {
getProfile: async (req, res) => {
try {
    const comments = await Comments.find({ user: req.user.id });
    res.render("profile.ejs", { comments: comments, user: req.user });
} catch (err) {
    console.log(err);
}
},
getFeed: async (req, res) => {
try {
    const comments = await Comments.find().sort({ createdAt: "desc" }).lean();
    res.render("feed.ejs", { comments: comments });
} catch (err) {
    console.log(err);
}
},
getPost: async (req, res) => {
try {
    const post = await Comments.findById(req.params.id);
    res.render("post.ejs", { comments: comments, user: req.user });
} catch (err) {
    console.log(err);
}
},
createPost: async (req, res) => {
try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    await Comments.create({
    title: req.body.title,
    image: result.secure_url,
    cloudinaryId: result.public_id,
    caption: req.body.caption,
    likes: 0,
    user: req.user.id,
    });
    console.log("Comment has been added!");
    res.redirect("/profile");
} catch (err) {
    console.log(err);
}
},
likePost: async (req, res) => {
try {
    await Comments.findOneAndUpdate(
    { _id: req.params.id },
    {
        $inc: { likes: 1 },
    }
    );
    console.log("Likes +1");
    res.redirect(`/post/${req.params.id}`);
} catch (err) {
    console.log(err);
}
},
deletePost: async (req, res) => {
try {
    // Find post by id
    let post = await Post.findById({ _id: req.params.id });
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(post.cloudinaryId);
    // Delete post from db
    await Post.remove({ _id: req.params.id });
    console.log("Deleted Post");
    res.redirect("/profile");
} catch (err) {
    res.redirect("/profile");
}
},
};
