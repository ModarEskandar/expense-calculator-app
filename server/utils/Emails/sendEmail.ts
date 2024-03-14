
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
import * as fs from 'fs';


export const sendEmail = async (email:string, subject:string, payload:{name: string,link: string}, template:any) => {
  try {

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,

      port: 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,      },
    });
    transporter.verify().then(console.log).catch(console.error);

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    
    const compiledTemplate = Handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    await transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error);
        
        return error;
      } else {
        return true;
      }
    });
  } catch (error) {
    console.log(error);

    return error;
  }
};
