import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class User {

    @Prop({
        required: true
    })
    name: string;

    @Prop({
        required: false,
        unique: true,
    })
    username: string;

    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
        required: true,
        minlength: 6,
    })
    password : string;

    @Prop({
        required: false,
        default: '',
    })
    profilePic : string;

    @Prop({
        required: false,
        default: [],
    })
    followers: string[];

    @Prop({
        required: false,
        maxlength: 200,
        default: '',
    })
    bio : string;

    @Prop({
        required: false,
        default: false,
    })
    isFrozen : boolean;

    @Prop({
        required: false,
        default: false,
    })
    isActive : boolean;

    @Prop({
        default: "LOCAL",
    })
    accountType : string;

    @Prop({
        default: "USER",
    })
    role : string;

    @Prop()
    refreshToken: string;
}
export const UserSchema = SchemaFactory.createForClass(User);