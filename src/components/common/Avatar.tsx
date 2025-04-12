import React from 'react';

interface AvatarProps {
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name = 'User', size = 'md', className = '' }) => {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'lg':
        return 'w-24 h-24 text-2xl';
      default: // md
        return 'w-12 h-12 text-lg';
    }
  };

  return (
    <div
      className={`${getSizeClasses()} ${className} rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar; 