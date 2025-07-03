import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongoose';
import User from '@/model/user';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'SuperSecret';
console.log('Hello');
// //GET request
// export async function GET(request) {
//   await dbConnect();
//   try {
//     const token = request.cookies.get('token')?.value;
//     if (!token) {
//       return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     const student = await student.findOne({ studentname: decoded.studentname });

//     if (!student) {
//       return NextResponse.json({ success: false, message: 'student not found' }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       studentname: student.studentname,
//       email: student.email,
//       mobile: student.mobile,
//       profilepic: student.profilepic,
//       name: student.name
//     });
//   } catch (err) {
//     return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
//   }
// }


// GET profile info
export async function GET(request) {
  await dbConnect();
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const student = await User.findOne({ rollNo: decoded.rollNo });

    if (!student) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      name: student.name,
      rollNo: student.rollNo,
      department: student.department,
      batchYear: student.batchYear,
      bio: student.bio || ""
    });
  } catch (error) {
    console.error('GET profile error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT to update bio
export async function PUT(request) {
  try {
    await dbConnect();
    const { bio } = await request.json();

    const rollNo = cookies().get('rollNo')?.value;
    if (!rollNo) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const updatedstudent = await student.findOneAndUpdate(
      { rollNo },
      { bio },
      { new: true }
    );

    if (!updatedstudent) {
      return NextResponse.json({ success: false, message: 'student not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Bio updated successfully' });
  } catch (error) {
    console.error('PUT profile error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
