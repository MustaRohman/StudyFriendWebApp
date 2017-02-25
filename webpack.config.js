const webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './app/app',
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Main: 'app/components/Main.jsx',
      Login: 'app/components/Login.jsx',
      TimetableForm: 'app/components/timetable/TimetableForm/TimetableForm.jsx',
      Datepicker: 'app/components/timetable/Datepicker/Datepicker.jsx',
      Config: 'app/components/timetable/Config/Config.jsx',
      AddSubject: 'app/components/timetable/AddSubject/AddSubject.jsx',
      TopicList: 'app/components/timetable/TopicList/TopicList.jsx',
      TopicInputField: 'app/components/timetable/TopicInputField/TopicInputField.jsx',
      TopicListItem: 'app/components/timetable/TopicListItem/TopicListItem.jsx',
      //
      timetable: 'app/component/timetable'
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }, {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      }
    ]
  }
};
