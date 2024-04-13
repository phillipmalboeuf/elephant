import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

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
    content?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCollectionSkeleton | TypeNavigationSkeleton | TypeProductSkeleton>>;
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
