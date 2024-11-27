import type { DocumentNode } from 'graphql';
import type { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import type { FetchResult, OperationVariables, TypedDocumentNode } from '@apollo/client/core';
import { Apollo } from './apollo';
import {
  EmptyObject,
  ExtraSubscriptionOptions,
  SubscriptionOptionsAlone,
} from './types';

@Injectable()
export abstract class Subscription<T = any, V extends OperationVariables = EmptyObject> {
  public abstract readonly document: DocumentNode | TypedDocumentNode<T, V>;
  public client = 'default';

  constructor(protected readonly apollo: Apollo) {}

  public subscribe(
    variables?: V,
    options?: SubscriptionOptionsAlone<V, T>,
    extra?: ExtraSubscriptionOptions,
  ): Observable<FetchResult<T>> {
    return this.apollo.use(this.client).subscribe<T, V>(
      {
        ...options,
        variables,
        query: this.document,
      },
      extra,
    );
  }
}
