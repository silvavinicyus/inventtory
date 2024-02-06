import { IError } from '@shared/IError'

export class AdminUserErrors extends IError {
  public static creationFailed(): IError {
    return new AdminUserErrors({
      statusCode: 500,
      body: {
        code: 'AU-001',
        message: 'Admin User creation error',
        shortMessage: 'adminUserCreationFailed',
      },
    })
  }

  public static notFound(): IError {
    return new AdminUserErrors({
      statusCode: 404,
      body: {
        code: 'AU-002',
        message: 'Admin User Not Found',
        shortMessage: 'adminUserNotFound',
      },
    })
  }

  public static loadFailed(): IError {
    return new AdminUserErrors({
      statusCode: 500,
      body: {
        code: 'AU-003',
        message: 'Failed to load admin user resource',
        shortMessage: 'loadFailed',
      },
    })
  }

  public static updateFailed(): IError {
    return new AdminUserErrors({
      statusCode: 500,
      body: {
        code: 'AU-004',
        message: 'Failed to update this admin user',
        shortMessage: 'updateFailed',
      },
    })
  }

  public static deleteFailed(): IError {
    return new AdminUserErrors({
      statusCode: 500,
      body: {
        code: 'AU-005',
        message: 'Failed to delete this admin user',
        shortMessage: 'deleteFailed',
      },
    })
  }

  public static missingUpdateFields(): IError {
    return new AdminUserErrors({
      statusCode: 400,
      body: {
        code: 'AU-006',
        message: 'No field to update received',
        shortMessage: 'missingUpdateFields',
      },
    })
  }
}
