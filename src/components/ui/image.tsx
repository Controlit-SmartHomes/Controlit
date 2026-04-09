import { forwardRef, type ImgHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt = '', ...props }, ref) => {
    return <img ref={ref} alt={alt} className={cn('max-w-full', className)} {...props} />;
  }
);

Image.displayName = 'Image';
