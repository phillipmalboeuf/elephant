import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCategoryFields {
    title: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
}

export type TypeCategorySkeleton = EntrySkeletonType<TypeCategoryFields, "category">;
export type TypeCategory<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCategorySkeleton, Modifiers, Locales>;

export function isTypeCategory<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeCategory<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'category'
}

export interface TypeCollectionFields {
    title: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    color?: EntryFieldTypes.Symbol;
    products?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProductSkeleton>>;
}

export type TypeCollectionSkeleton = EntrySkeletonType<TypeCollectionFields, "collection">;
export type TypeCollection<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCollectionSkeleton, Modifiers, Locales>;

export function isTypeCollection<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeCollection<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'collection'
}

export interface TypeFormFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    action: EntryFieldTypes.Symbol;
    inputs?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeInputSkeleton>>;
    button?: EntryFieldTypes.Symbol;
}

export type TypeFormSkeleton = EntrySkeletonType<TypeFormFields, "form">;
export type TypeForm<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeFormSkeleton, Modifiers, Locales>;

export function isTypeForm<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeForm<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'form'
}

export interface TypeHeroFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    buttons?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeNavigationLinkSkeleton>>;
}

export type TypeHeroSkeleton = EntrySkeletonType<TypeHeroFields, "hero">;
export type TypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHeroSkeleton, Modifiers, Locales>;

export function isTypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeHero<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'hero'
}

export interface TypeInputFields {
    label: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    type?: EntryFieldTypes.Symbol<"Dropdown" | "Email" | "Text" | "Textarea">;
    options?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeInputSkeleton = EntrySkeletonType<TypeInputFields, "input">;
export type TypeInput<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeInputSkeleton, Modifiers, Locales>;

export function isTypeInput<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeInput<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'input'
}

export interface TypeModelFields {
    title: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    sku: EntryFieldTypes.Symbol;
    surfaceX: EntryFieldTypes.Number;
    surfaceY: EntryFieldTypes.Number;
    height: EntryFieldTypes.Number;
    security?: EntryFieldTypes.Symbol;
    gallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    downloads?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeModelSkeleton = EntrySkeletonType<TypeModelFields, "model">;
export type TypeModel<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeModelSkeleton, Modifiers, Locales>;

export function isTypeModel<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeModel<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'model'
}

export interface TypeNavigationFields {
    id: EntryFieldTypes.Symbol;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeNavigationLinkSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export function isTypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigation'
}

export interface TypeNavigationLinkFields {
    label?: EntryFieldTypes.Symbol;
    path?: EntryFieldTypes.Symbol;
    external?: EntryFieldTypes.Boolean;
    color?: EntryFieldTypes.Symbol;
}

export type TypeNavigationLinkSkeleton = EntrySkeletonType<TypeNavigationLinkFields, "navigationLink">;
export type TypeNavigationLink<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNavigationLinkSkeleton, Modifiers, Locales>;

export function isTypeNavigationLink<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigationLink<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigationLink'
}

export interface TypePageFields {
    title?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    image?: EntryFieldTypes.AssetLink;
    gallerie?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    link?: EntryFieldTypes.EntryLink<TypeNavigationLinkSkeleton>;
    content?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCollectionSkeleton | TypeFormSkeleton | TypeHeroSkeleton | TypeNavigationSkeleton | TypeProductSkeleton | TypeProjectSkeleton | TypeRealisationsSkeleton | TypeRepsSkeleton | TypeTextSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'page'
}

export interface TypeProductFields {
    title: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    sku: EntryFieldTypes.Symbol;
    thumbnail?: EntryFieldTypes.AssetLink;
    ageMin?: EntryFieldTypes.Integer;
    ageMax?: EntryFieldTypes.Integer;
    type?: EntryFieldTypes.Symbol;
    gallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    models?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeModelSkeleton>>;
}

export type TypeProductSkeleton = EntrySkeletonType<TypeProductFields, "product">;
export type TypeProduct<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProductSkeleton, Modifiers, Locales>;

export function isTypeProduct<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeProduct<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'product'
}

export interface TypeProjectFields {
    title: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    categories?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCategorySkeleton>>;
    location?: EntryFieldTypes.Symbol;
    year?: EntryFieldTypes.Integer;
    type?: EntryFieldTypes.Symbol;
    surface?: EntryFieldTypes.Symbol;
    height?: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    thumbnail?: EntryFieldTypes.AssetLink;
    gallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    body?: EntryFieldTypes.RichText;
    products?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProductSkeleton>>;
}

export type TypeProjectSkeleton = EntrySkeletonType<TypeProjectFields, "project">;
export type TypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProjectSkeleton, Modifiers, Locales>;

export function isTypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeProject<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'project'
}

export interface TypeRealisationsFields {
    title: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    color?: EntryFieldTypes.Symbol;
    projects?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectSkeleton>>;
}

export type TypeRealisationsSkeleton = EntrySkeletonType<TypeRealisationsFields, "realisations">;
export type TypeRealisations<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeRealisationsSkeleton, Modifiers, Locales>;

export function isTypeRealisations<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeRealisations<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'realisations'
}

export interface TypeRepFields {
    name: EntryFieldTypes.Text;
    id: EntryFieldTypes.Symbol;
    city?: EntryFieldTypes.Text;
    state?: EntryFieldTypes.Text;
    location: EntryFieldTypes.Location;
    email?: EntryFieldTypes.Symbol;
    phone?: EntryFieldTypes.Symbol;
}

export type TypeRepSkeleton = EntrySkeletonType<TypeRepFields, "rep">;
export type TypeRep<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeRepSkeleton, Modifiers, Locales>;

export function isTypeRep<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeRep<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'rep'
}

export interface TypeRepsFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    reps?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeRepSkeleton>>;
}

export type TypeRepsSkeleton = EntrySkeletonType<TypeRepsFields, "reps">;
export type TypeReps<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeRepsSkeleton, Modifiers, Locales>;

export function isTypeReps<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeReps<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'reps'
}

export interface TypeTextFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    buttons?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeNavigationLinkSkeleton>>;
    style?: EntryFieldTypes.Symbol<"Overflow">;
    body?: EntryFieldTypes.RichText;
}

export type TypeTextSkeleton = EntrySkeletonType<TypeTextFields, "text">;
export type TypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTextSkeleton, Modifiers, Locales>;

export function isTypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeText<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'text'
}
