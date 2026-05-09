import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  standalone: true,
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeResourceUrl {
    const embedUrl = this.toYoutubeEmbed(value);
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  private toYoutubeEmbed(url: string): string {
    // https://www.youtube.com/watch?v=XXXX  →  https://www.youtube.com/embed/XXXX
    const watchMatch = url.match(/youtube\.com\/watch\?v=([\w-]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

    // https://youtu.be/XXXX  →  https://www.youtube.com/embed/XXXX
    const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

    return url;
  }
}
