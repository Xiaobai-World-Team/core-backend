import * as mongoose from 'mongoose';

const url = process.env.mongoURL;

export function mongooseConnect() {
  return mongoose.connect(url ? url : 'mongodb://root:admin123@localhost', {
    dbName: 'xiaobai',
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
}
