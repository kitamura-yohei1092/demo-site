export interface Blog {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly content: string;
  readonly excerpt: string | null;
  readonly published: boolean;
  readonly meta_title: string | null;
  readonly meta_description: string | null;
  readonly og_image: string | null;
  readonly canonical_url: string | null;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface BlogFormData {
  readonly title: string;
  readonly slug: string;
  readonly content: string;
  readonly excerpt: string;
  readonly published: boolean;
  readonly meta_title: string;
  readonly meta_description: string;
  readonly og_image: string;
  readonly canonical_url: string;
}
