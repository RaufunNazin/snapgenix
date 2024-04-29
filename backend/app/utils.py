from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password) :
    return pwd_context.verify(plain_password, hashed_password)
    current_time = datetime.now()
    age = current_time.year - dob.year - ((current_time.month, current_time.day) < (dob.month, dob.day))
    return age