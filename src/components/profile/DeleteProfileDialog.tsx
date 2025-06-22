
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Trash2, AlertTriangle } from 'lucide-react';

interface DeleteProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteProfileDialog = ({ isOpen, onClose }: DeleteProfileDialogProps) => {
  const { logout } = useAuth();

  const handleDelete = () => {
    // In a real app, this would delete the user account from the database
    toast.success('Account deleted successfully');
    logout();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-6 w-6" />
            Delete Account
          </DialogTitle>
          <DialogDescription className="text-red-600">
            This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-red-100 border border-red-300 rounded-lg p-4 my-4">
          <h4 className="font-semibold text-red-800 mb-2">What will be deleted:</h4>
          <ul className="list-disc list-inside text-red-700 space-y-1">
            <li>Your profile information</li>
            <li>All your connections</li>
            <li>Chat history and messages</li>
            <li>Verification status</li>
          </ul>
        </div>

        <DialogFooter>
          <Button 
            onClick={onClose}
            variant="outline"
            className="bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProfileDialog;
