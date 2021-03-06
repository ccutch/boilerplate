
const cssNamingTemplate = process.env.NODE_ENV === "production" ?
                            "[hash:base64:15]" :
                            "file-[name]___class-[local]___production-[hash:base64:15]"


module.exports = {

  entry: {
    worker: "./app/service_workers/service-worker.static.js",
    config: "./app/config/manifest.json",
    bundle: "./app/app.js",
    html: "./app/index.html",
  },

  output: {
    filename: "[name].js",
    path: `${__dirname}/dist`
  },

  resolve: {
    modulesDirectories: [
      "node_modules",
      "app"
    ]
  },

  module: {
    loaders: [
      {
        test: /\.static\.js$/,
        loaders: ["file?name=service-worker.js", "babel"],
        exclude: /node_modules/
      },

      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        loader: "style!css?modules&localIdentName=" + cssNamingTemplate,
        exclude: /node_modules/
      },

      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },

      {
        test: /\.json$/,
        loader: "file?name=[name].[ext]",
      }
    ]
  }
}
