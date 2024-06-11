import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
      try {   
        const { password,student: studentData } = req.body;
        //data validation using zod
        // const zodParsedData = studentValidationSchema.parse(studentData)
    
        const result = await UserServices.createStudentIntoDB(password,studentData);
        res.status(200).json({
          success: true,
          message: 'Student is created successfully',
          data: result,
        });
      } catch (err:any) {
        res.status(500).json({
          success: true,
          message: err.message ||  'Something went wrong',
          error: err,
        });
      }
    };