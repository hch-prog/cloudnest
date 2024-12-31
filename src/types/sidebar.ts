import { JSX } from 'react';

export interface SidebarItem {
    name: string;
    icon: JSX.Element;
    count?: number;
    active?: boolean;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  } 