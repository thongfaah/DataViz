// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectMongoDB } from "../../../../../lib/mongodb";
// import User from "../../../../../models/user";
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken';

// const SECRET = "mysecretkey";

// const authOptions = {
//     providers: [
//         CredentialsProvider({
        
//           name: 'credentials',
          
//           credentials: {},
//           async authorize(credentials, req) {
            
//             const {email, password} = credentials;

//             try{

//                 await connectMongoDB();
//                 const user = await User.findOne({ email });

//                 if (!user){
//                     return null;
//                 }

//                 const passwordMatch = await bcrypt.compare(password, user.password);

//                 if (!passwordMatch){
//                     return null;
//                 }

//                 return user;

//             } catch(error){
//                 console.log("Error: ", error);
//             }
           
//           }
//         })
//       ],
//       session: {
//         strategy: "jwt",
//       },
//       secret: process.env.NEXTAUTH_SECRET,
//       pages: {
//         signIn: "/login"
//       },

//       callbacks: {
//         async jwt({ token, user }) {
//           if (user) {
//             token.id = user._id; //  เก็บ _id ลง token
//           }
//           return token;
//         },
//         async session({ session, token }) {
//           if (token) {
//             session.user.id = token.id; // เก็บ id ลง session
//           }
//           return session;
//         }
//       }
// }

// const handler = NextAuth(authOptions);
// export {handler as GET, handler as POST};

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = "mysecretkey"; // ✅ ควรเปลี่ยนไปใช้ process.env.JWT_SECRET เพื่อความปลอดภัย

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // ✅ เชื่อมต่อ MongoDB
          await connectMongoDB();

          // ✅ ค้นหาผู้ใช้งานจาก Email
          const user = await User.findOne({ email });

          if (!user) {
            console.log("❌ User not found");
            return null;
          }

          // ✅ ตรวจสอบรหัสผ่าน
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            console.log("❌ Password mismatch");
            return null;
          }

          // ✅ ถ้าถูกต้อง คืนค่าข้อมูลผู้ใช้งาน
          return user;

        } catch (error) {
          console.error("Error during authorization: ", error);
          return null;
        }
      },
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;

        // ✅ สร้าง JWT Token
        token.jwt = jwt.sign(
          { userId: user._id, email: user.email },
          SECRET,
          { expiresIn: "1h" }  // สามารถปรับเวลาได้
        );
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.jwt = token.jwt; // ✅ ใส่ JWT ลงใน Session
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
