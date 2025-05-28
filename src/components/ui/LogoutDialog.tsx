"use client"

import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogFooter,
   DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface LogoutDialogProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

export default function LogoutDialog ({open, onClose, onConfirm} : LogoutDialogProps) {
    return(
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[400px] h-[160px]">
                <DialogHeader>
                    <DialogTitle>Logout</DialogTitle>
                    <DialogDescription>Are you sure want to logout?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button className="transition-all transform hover:scale-95 duration-300 hover:cursor-pointer" variant="outline" onClick={onClose}>Cancel</Button>
                    </DialogClose>
                        <Button className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer transition-all transform hover:scale-95 duration-300" onClick={onConfirm}>Logout</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}