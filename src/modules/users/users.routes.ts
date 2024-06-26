import { Router } from 'express';
import multer from 'multer';
import { storage } from '../../utils/multerConfig';
import { createUserController } from './controllers/Create/CreateUserController';
import { deleteUserController } from './controllers/DeleteUserController';
import { listUsers } from './controllers/List/ListUsersController';
import { loginController } from './controllers/LoginController';
import { updateUserController } from './controllers/UpdateUserController';
import { listUserDetails } from './controllers/List/ListUserDetailsController';
import { followUserController } from './controllers/FollowUserController';
import { unfollowUserController } from './controllers/UnFollowUserController';

const usersRoutes = Router();
const upload = multer({ storage });

usersRoutes.post("/login", (request, response) => {
    return loginController(request, response);
});

usersRoutes.post("/create", (request, response) => {
    return createUserController(request, response);
});

usersRoutes.post("/follow", (request, response) => {
    return followUserController(request, response);
});

usersRoutes.post("/unfollow", (request, response) => {
    return unfollowUserController(request, response);
});

usersRoutes.get("/", (request, response) => {
    return listUsers(request, response);
});

usersRoutes.get("/details", (request, response) => {
    return listUserDetails(request, response);
});

usersRoutes.put("/update", (request, response) => {
    return updateUserController(request, response);
});

usersRoutes.delete("/delete", (request, response) => {
    return deleteUserController(request, response);
});

export { usersRoutes }