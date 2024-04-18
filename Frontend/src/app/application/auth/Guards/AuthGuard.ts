import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../../../infrastructure/state/UserStore';

export const authGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);

  if (!userStore.getUser()()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
