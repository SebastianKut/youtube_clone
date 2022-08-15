import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { customAlphabet } from 'nanoid';
import { User } from '../user/user.model';

// create custom ID with only alphanum values
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

export class Video {
  @prop()
  public title: string;

  @prop()
  public description: string;

  @prop({ enum: ['mp4'] }) //list of allowed values
  public extension: string;

  @prop({ required: true, ref: () => User })
  public owner: Ref<User>;

  @prop({ unique: true, default: () => nanoid() })
  //because its unique, mongo will index it which will make lookups really fast
  public videoId: string;

  @prop({ default: false })
  public published: boolean;
}

export const VideoModel = getModelForClass(Video, {
  schemaOptions: {
    timestamps: true,
  },
});
