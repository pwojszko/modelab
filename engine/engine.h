/**
 * @file engine.h
 * @brief Main header file for the Engine library
 * @details The library contains functions for performing basic mathematical operations
 *          and data processing. All functions are exported as C API for
 *          easy integration with other programming languages.
 */

#ifndef ENGINE_H
#define ENGINE_H

#ifdef __cplusplus
extern "C" {
#endif

/**
 * @defgroup EngineAPI Engine API
 * @brief Set of functions for the Engine library
 * @{
 */

// Export macros for Windows
#ifdef _WIN32
    #ifdef ENGINE_EXPORTS
        #define ENGINE_API __declspec(dllexport)
    #else
        #define ENGINE_API __declspec(dllimport)
    #endif
#else
    #define ENGINE_API
#endif

/**
 * @brief Adds two integers
 * @param a First number
 * @param b Second number
 * @return Sum of a and b
 * @example
 * @code
 * int result = add(5, 3);  // result = 8
 * @endcode
 */
ENGINE_API int add(int a, int b);

/**
 * @brief Multiplies two integers
 * @param a First number
 * @param b Second number
 * @return Product of a and b
 * @example
 * @code
 * int result = multiply(4, 7);  // result = 28
 * @endcode
 */
ENGINE_API int multiply(int a, int b);

/**
 * @brief Calculates the factorial of an integer
 * @param n Number for which factorial is calculated (n >= 0)
 * @return Factorial of n. Returns -1 on error (n < 0)
 * @note For n = 0 or n = 1 returns 1
 * @warning For large values of n, overflow may occur
 * @example
 * @code
 * long long result = factorial(5);  // result = 120
 * @endcode
 */
ENGINE_API long long factorial(int n);

/**
 * @brief Processes a string by converting it to uppercase
 * @param input Pointer to input string (null-terminated)
 * @param output Output buffer where the result will be written
 * @param output_size Size of the output buffer (including null terminator)
 * @return Number of copied characters (without null terminator). Returns -1 on error
 * @note Function copies at most (output_size - 1) characters and always adds null terminator
 * @warning Function does not check if output_size is large enough for the entire input
 * @example
 * @code
 * char output[100];
 * int len = process_string("hello", output, 100);  // output = "HELLO", len = 5
 * @endcode
 */
ENGINE_API int process_string(const char* input, char* output, int output_size);

/**
 * @brief Calculates the sum of elements in a floating-point array
 * @param array Pointer to array of double values
 * @param size Number of elements in the array
 * @return Sum of all array elements. Returns 0.0 on error (nullptr or size <= 0)
 * @note Function is safe for empty arrays (returns 0.0)
 * @example
 * @code
 * double arr[] = {1.5, 2.5, 3.5};
 * double sum = sum_array(arr, 3);  // sum = 7.5
 * @endcode
 */
ENGINE_API double sum_array(double* array, int size);

/**
 * @}
 */

#ifdef __cplusplus
}
#endif

#endif // ENGINE_H
