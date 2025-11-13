import * as ics from 'ics';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Export calendar events to ICS file
 */
export interface CalendarEventExport {
  title: string;
  description?: string;
  start: Date;
  end?: Date;
  location?: string;
  url?: string;
}

export function exportToICS(events: CalendarEventExport[], filename: string = 'calendar.ics'): void {
  const icsEvents = events.map((event) => {
    const start = event.start;
    const end = event.end || new Date(start.getTime() + 60 * 60 * 1000); // Default 1 hour duration

    return {
      start: [
        start.getFullYear(),
        start.getMonth() + 1,
        start.getDate(),
        start.getHours(),
        start.getMinutes(),
      ] as [number, number, number, number, number],
      end: [
        end.getFullYear(),
        end.getMonth() + 1,
        end.getDate(),
        end.getHours(),
        end.getMinutes(),
      ] as [number, number, number, number, number],
      title: event.title,
      description: event.description,
      location: event.location,
      url: event.url,
    };
  });

  try {
    const { error, value } = ics.createEvents(icsEvents);

    if (error) {
      console.error('Error creating ICS:', error);
      return;
    }

    if (!value) {
      console.error('No ICS content generated');
      return;
    }

    downloadFile(value, filename, 'text/calendar');
  } catch (error) {
    console.error('Failed to export to ICS:', error);
  }
}

/**
 * Export news articles to PDF
 */
export interface NewsArticleExport {
  title: string;
  source?: string;
  date?: Date;
  content: string;
  url?: string;
}

export function exportNewsToPDF(
  articles: NewsArticleExport[],
  filename: string = 'news-articles.pdf'
): void {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(20);
  doc.text('News Articles Export', 14, 20);

  // Add metadata
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
  doc.text(`Total Articles: ${articles.length}`, 14, 33);

  let yPosition = 45;

  articles.forEach((article, index) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // Article title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(article.title, 180);
    doc.text(titleLines, 14, yPosition);
    yPosition += titleLines.length * 7;

    // Metadata
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    if (article.source) {
      doc.text(`Source: ${article.source}`, 14, yPosition);
      yPosition += 5;
    }
    if (article.date) {
      doc.text(`Date: ${article.date.toLocaleString()}`, 14, yPosition);
      yPosition += 5;
    }
    if (article.url) {
      doc.textWithLink('Read more', 14, yPosition, { url: article.url });
      yPosition += 5;
    }

    // Content
    doc.setFontSize(10);
    doc.setTextColor(0);
    const contentLines = doc.splitTextToSize(article.content, 180);
    doc.text(contentLines, 14, yPosition + 3);
    yPosition += contentLines.length * 5 + 15;

    // Separator
    if (index < articles.length - 1) {
      doc.setDrawColor(200);
      doc.line(14, yPosition - 10, 196, yPosition - 10);
    }
  });

  // Save PDF
  doc.save(filename);
}

/**
 * Export bookmarks to JSON
 */
export function exportBookmarksToJSON(bookmarks: any[], filename: string = 'bookmarks.json'): void {
  const data = JSON.stringify(bookmarks, null, 2);
  downloadFile(data, filename, 'application/json');
}

/**
 * Share to social media
 */
export interface ShareOptions {
  title: string;
  text?: string;
  url: string;
}

export function shareToTwitter(options: ShareOptions): void {
  const text = encodeURIComponent(`${options.title}\n${options.text || ''}`);
  const url = encodeURIComponent(options.url);
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    '_blank',
    'width=550,height=420'
  );
}

export function shareToLinkedIn(options: ShareOptions): void {
  const url = encodeURIComponent(options.url);
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    '_blank',
    'width=550,height=420'
  );
}

export function shareToFacebook(options: ShareOptions): void {
  const url = encodeURIComponent(options.url);
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    '_blank',
    'width=550,height=420'
  );
}

export function shareToReddit(options: ShareOptions): void {
  const title = encodeURIComponent(options.title);
  const url = encodeURIComponent(options.url);
  window.open(
    `https://reddit.com/submit?title=${title}&url=${url}`,
    '_blank',
    'width=550,height=420'
  );
}

/**
 * Use Web Share API if available
 */
export async function shareNative(options: ShareOptions): Promise<boolean> {
  if (!navigator.share) {
    return false;
  }

  try {
    await navigator.share({
      title: options.title,
      text: options.text,
      url: options.url,
    });
    return true;
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('Error sharing:', error);
    }
    return false;
  }
}

/**
 * Copy permalink to clipboard
 */
export async function copyPermalink(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.error('Failed to copy permalink:', error);
    return false;
  }
}

/**
 * Generate permalink for an item
 */
export function generatePermalink(type: 'news' | 'event' | 'post', id: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/${type}/${id}`;
}

/**
 * Helper function to download files
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export data as CSV
 */
export function exportToCSV(
  data: any[],
  headers: string[],
  filename: string = 'export.csv'
): void {
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers.map((header) => {
        const value = row[header] || '';
        // Escape commas and quotes
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',')
    ),
  ].join('\n');

  downloadFile(csvContent, filename, 'text/csv');
}
