

import { OtpModel } from "../../models/otp.models";

export class OtpRepository {
  async createOtp(email: string, otp: string, user: { name: string; email: string; password: string; role: string }): Promise<void> {
    await OtpModel.findOneAndDelete({ email }); 
    await OtpModel.create({ email, otp, user });
  }

  async findOtp(email: string) {
    return await OtpModel.findOne({ email });
  }

  async deleteOtp(email: string): Promise<void> {
    await OtpModel.deleteOne({ email });
  }
}
