
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText } from 'lucide-react';

interface DocumentsStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

const DocumentsStep = ({ formData, updateFormData }: DocumentsStepProps) => {
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ passportFile: file });
    }
  };

  return (
    <div className="space-y-6">
      {/* Passport Information */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Passport Information</CardTitle>
          <CardDescription className="text-white/80">
            Upload your passport and provide passport details for verification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="passportFile" className="text-white font-semibold">Upload Passport</Label>
            <div className="border-dashed border-2 border-white/30 rounded-lg p-6 text-center bg-white/10">
              <input
                id="passportFile"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="passportFile" className="cursor-pointer">
                <Upload className="h-12 w-12 text-white/60 mx-auto mb-4" />
                <p className="text-white/80">
                  {formData.passportFile ? formData.passportFile.name : 'Click to upload passport document'}
                </p>
                <p className="text-white/60 text-sm mt-2">
                  Accepted formats: PDF, JPG, PNG (Max 10MB)
                </p>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passportNumber" className="text-white font-semibold">Passport Number</Label>
              <Input
                id="passportNumber"
                type="text"
                placeholder="Enter passport number"
                value={formData.passportNumber}
                onChange={(e) => handleChange('passportNumber', e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passportExpiry" className="text-white font-semibold">Passport Expiry Date</Label>
              <Input
                id="passportExpiry"
                type="date"
                value={formData.passportExpiry}
                onChange={(e) => handleChange('passportExpiry', e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visa Status */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Visa & Travel Status</CardTitle>
          <CardDescription className="text-white/80">
            Information about your current visa and travel authorization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="visaStatus" className="text-white font-semibold">Current Visa Status</Label>
            <Select value={formData.visaStatus} onValueChange={(value) => handleChange('visaStatus', value)}>
              <SelectTrigger className="bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Select your visa status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300">
                <SelectItem value="citizen">Citizen</SelectItem>
                <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                <SelectItem value="student-visa">Student Visa</SelectItem>
                <SelectItem value="work-visa">Work Visa</SelectItem>
                <SelectItem value="tourist-visa">Tourist Visa</SelectItem>
                <SelectItem value="business-visa">Business Visa</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Additional Documents */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Additional Information</CardTitle>
          <CardDescription className="text-white/80">
            Any additional documents or information you'd like to provide
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-dashed border-2 border-white/30 rounded-lg p-6 text-center bg-white/10">
            <FileText className="h-12 w-12 text-white/60 mx-auto mb-4" />
            <p className="text-white/80">Additional documents (optional)</p>
            <p className="text-white/60 text-sm mt-2">
              You can upload additional verification documents here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsStep;
