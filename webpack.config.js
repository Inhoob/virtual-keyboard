const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin"); //추가 웹팩 플러그인
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  entry: "./src/js/index.js", //자바스크립트의 진입점
  output: {
    //빌드를 했을때 번들파일 관련 속성
    filename: "bundle.js", //번들될 파일의 이름
    path: path.resolve(__dirname, "docs"), //번들될 파일이 생성될 경로.path에 절대경로를 찾아주도록 함.
    clean: true, //번들파일이 생성될 경로에 다른파일이 있다면 그것을 다 지우고 생성하는 속성
  },
  devtool: "source-map", //빌드한 파일과 원본 파일 연결
  mode: "development", //프로덕션과 디벨롭먼트. 자바스크립트 css html에 대한 구축
  plugins: [
    new HtmlWebpackPlugin({
      title: "keyboard", //webpage 의 탭의 이름
      template: "./index.html", //이것을 사용하면 index.html파일에서 lodash 문법을 사용할 수 있다
      inject: "body", //파일을 빌드했을 때 자바스크립트 파일을바디에 설정한다는 뜻. 이걸 안하면 head쪽으로 들어간다.
      favicon: "./favicon.png",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  devServer: {
    host: "localhost",
    port: 8080,
    open: true,
    watchFiles: "index.html",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], //css파일을 이런 로더를 사용해서 읽겠다.
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
  },
};
