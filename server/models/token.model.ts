import {
    Ref,
    getModelForClass,
    index,
    modelOptions,
    prop,
  } from '@typegoose/typegoose';
import { User } from './user.models';
  
  @index({ token:1,user: 1 })
  @modelOptions({
    schemaOptions: {
      // Add createdAt and updatedAt fields
      timestamps: true,
    },
  })
  
  // Export the Token class to be used as TypeScript type
   export class Token {
    @prop()
    token: string;
   
    @prop({ ref: () => User, required: true })
    user: Ref<User,string>;

  
  }
  
  // Create the Token model from the Token class
  const TokenModel = getModelForClass(Token);
  export default TokenModel;

  
  
  